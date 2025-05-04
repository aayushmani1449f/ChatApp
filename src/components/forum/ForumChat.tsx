import React, { useEffect, useState, useRef } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, File, Image, Paperclip, Send } from "lucide-react";
import { Topic } from "@/lib/forum-topics";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhotoURL: string;
  timestamp: number;
  mediaUrl?: string;
  mediaType?: string;
}

interface ForumChatProps {
  topic: Topic;
}

export const ForumChat = ({ topic }: ForumChatProps) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const STORAGE_KEY = `forum-${topic.id}-messages`;

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load messages from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    }
  }, [topic.id]);

  const saveMessages = (updatedMessages: Message[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!currentUser) return;

    if (!newMessage.trim() && !file) {
      toast({ description: "Please enter a message or attach a file" });
      return;
    }

    try {
      setIsUploading(file !== null);

      let mediaUrl = "";
      let mediaType = "";

      if (file) {
        const fileRef = ref(storage, `forums/${topic.id}/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        mediaUrl = await getDownloadURL(fileRef);
        mediaType = file.type.split("/")[0];
      }

      const newMsg: Message = {
        id: `${Date.now()}`,
        text: newMessage,
        userId: currentUser.uid,
        userName: currentUser.displayName || "Anonymous",
        userPhotoURL: currentUser.photoURL || "",
        timestamp: Date.now(),
        mediaUrl,
        mediaType,
      };

      const updated = [...messages, newMsg];
      saveMessages(updated);

      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const renderMedia = (message: Message) => {
    if (!message.mediaUrl) return null;

    if (message.mediaType === "image") {
      return (
        <div className="mt-2 rounded-md overflow-hidden">
          <img
            src={message.mediaUrl}
            alt="Attached"
            className="max-h-60 object-contain"
            onLoad={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>
      );
    } else if (message.mediaType === "video") {
      return (
        <div className="mt-2 rounded-md overflow-hidden">
          <video
            src={message.mediaUrl}
            controls
            className="max-h-60 max-w-full"
            onLoadedData={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
          />
        </div>
      );
    } else {
      return (
        <a
          href={message.mediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-2 p-2 bg-secondary rounded text-sm"
        >
          <File className="mr-2 h-4 w-4" />
          Attachment
        </a>
      );
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex items-center p-4 border-b">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground mr-2">
          <span>{topic.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold">{topic.name}</h3>
          <p className="text-xs text-muted-foreground">{topic.description}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MessageSquare className="h-10 w-10 mb-2" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.userId === currentUser?.uid ? "justify-end" : "justify-start"
            } gap-2 items-start animate-fade-in`}
          >
            {message.userId !== currentUser?.uid && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.userPhotoURL || undefined} />
                <AvatarFallback>{message.userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            )}

            <div className="max-w-[70%]">
              <div
                className={`p-3 rounded-lg ${
                  message.userId === currentUser?.uid
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.userId !== currentUser?.uid && (
                  <p className="text-xs font-semibold mb-1">{message.userName}</p>
                )}
                <p>{message.text}</p>
                {renderMedia(message)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{formatTime(message.timestamp)}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={`Message ${topic.name}...`}
              className="min-h-[80px] pr-10"
              disabled={isUploading}
            />
            <div className="absolute right-2 bottom-2">
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-opacity-50 rounded-full border-t-transparent" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {file && (
          <div className="mt-2 flex items-center space-x-2 text-xs text-muted-foreground">
            {file.type.includes("image") ? (
              <Image className="h-4 w-4" />
            ) : (
              <File className="h-4 w-4" />
            )}
            <span className="truncate">{file.name}</span>
          </div>
        )}
      </form>
    </div>
  );
};
