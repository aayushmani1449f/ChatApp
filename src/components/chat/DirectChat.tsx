import React, { useEffect, useState, useRef } from "react";
import {
  collection, addDoc, query, orderBy, onSnapshot, Timestamp, serverTimestamp
} from "firebase/firestore";
import {
  ref, uploadBytes, getDownloadURL
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, File, Image, Paperclip, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  senderPhotoURL: string;
  recipientId: string;
  timestamp: Timestamp;
  mediaUrl?: string;
  mediaType?: string;
}

interface DirectChatProps {
  recipient: ChatUser;
}

export const DirectChat = ({ recipient }: DirectChatProps) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chatId = currentUser ? [currentUser.uid, recipient.uid].sort().join("_") : null;
  const draftKey = `draft_${chatId}`;

  // Load draft from localStorage
  useEffect(() => {
    if (chatId) {
      const savedDraft = localStorage.getItem(draftKey);
      if (savedDraft) setNewMessage(savedDraft);
    }
  }, [chatId]);

  // Save draft to localStorage
  useEffect(() => {
    if (chatId) {
      localStorage.setItem(draftKey, newMessage);
    }
  }, [newMessage, chatId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch chat messages
  useEffect(() => {
    if (!chatId || !currentUser || !recipient) return;

    const q = query(collection(db, `chats/${chatId}/messages`), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageData: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Message, 'id'>)
      }));
      setMessages(messageData);
    });

    return () => unsubscribe();
  }, [chatId, currentUser, recipient]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser || !chatId) return;

    if (!newMessage.trim() && !file) {
      toast({ description: "Please enter a message or attach a file" });
      return;
    }

    try {
      setIsUploading(Boolean(file));

      let mediaUrl = "";
      let mediaType = "";

      if (file) {
        const fileRef = ref(storage, `chats/${chatId}/${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        mediaUrl = await getDownloadURL(fileRef);
        mediaType = file.type.split("/")[0]; // "image", "video", etc.
      }

      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: newMessage,
        senderId: currentUser.uid,
        senderName: currentUser.displayName || "Anonymous",
        senderPhotoURL: currentUser.photoURL || "",
        recipientId: recipient.uid,
        timestamp: serverTimestamp(),
        mediaUrl,
        mediaType,
      });

      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      localStorage.removeItem(draftKey); // clear draft after sending
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
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
            onLoad={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
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
            onLoadedData={() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })}
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
    <div className="flex flex-col border rounded-lg h-[600px]">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={recipient.photoURL || undefined} />
          <AvatarFallback>{recipient.displayName.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{recipient.displayName}</h3>
          <p className="text-xs text-muted-foreground">{recipient.email}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <MessageSquare className="h-10 w-10 mb-2" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === currentUser?.uid ? "justify-end" : "justify-start"
              } gap-2 items-start animate-fade-in`}
            >
              {message.senderId !== currentUser?.uid && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.senderPhotoURL || undefined} />
                  <AvatarFallback>{message.senderName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              )}

              <div className="max-w-[70%]">
                <div
                  className={`p-3 rounded-lg ${
                    message.senderId === currentUser?.uid
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <p>{message.text}</p>
                  {renderMedia(message)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-4 border-t"
      >
        <div className="flex items-end gap-2">
          <div className="relative flex-1">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${recipient.displayName}...`}
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
            {file.type.includes("image") ? <Image className="h-4 w-4" /> : <File className="h-4 w-4" />}
            <span className="truncate">{file.name}</span>
          </div>
        )}
      </form>
    </div>
  );
};
