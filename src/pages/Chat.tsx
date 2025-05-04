import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, onSnapshot, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/navbar/Navbar";
import { DirectChat } from "@/components/chat/DirectChat";
import { UserList } from "@/components/chat/UserList";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";

interface ChatUser {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
}

const Chat = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  useEffect(() => {
    if (currentUser) {
      // Fetch all users
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "!=", currentUser.uid));

      const fetchUsers = async () => {
        const querySnapshot = await getDocs(q);
        const usersList: ChatUser[] = [];
        querySnapshot.forEach((doc) => {
          usersList.push(doc.data() as ChatUser);
        });
        setUsers(usersList);
      };

      fetchUsers();

      // Create or update current user in users collection
      const updateUserProfile = async () => {
        const userRef = collection(db, "users");
        const q = query(userRef, where("uid", "==", currentUser.uid));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          // User doesn't exist yet, create them
          const usersCollection = collection(db, "users");
          await addDoc(usersCollection, {
            uid: currentUser.uid,
            displayName: currentUser.displayName || "Anonymous",
            photoURL: currentUser.photoURL || "",
            email: currentUser.email || "",
          });
        }
      };

      updateUserProfile();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Direct Messages | My ChatApp</title>
        <meta name="description" content="Chat directly with other users" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Direct Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <UserList 
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>
          
          <div className="md:col-span-3">
            {selectedUser ? (
              <DirectChat recipient={selectedUser} />
            ) : (
              <div className="h-[600px] flex items-center justify-center border rounded-lg bg-muted/30">
                <div className="text-center p-4">
                  <h3 className="font-semibold text-lg">Select a user to start chatting</h3>
                  <p className="text-muted-foreground">Choose from the list on the left</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
