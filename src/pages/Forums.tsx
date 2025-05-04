
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ForumChat } from "@/components/forum/ForumChat";
import { gamesTopic, moviesTopic, sportsTopic, technologyTopic, generalTopic } from "@/lib/forum-topics";

const Forums = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

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
        <title>Forums | My ChatApp</title>
        <meta name="description" content="Chat forums on various topics" />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">Chat Forums</h1>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted">
            <CardTitle>Topic Forums</CardTitle>
            <CardDescription>
              Join conversations on your favorite topics
            </CardDescription>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="games">Games</TabsTrigger>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>
            
            <CardContent className="p-0">
              <TabsContent value="general" className="m-0">
                <ForumChat topic={generalTopic} />
              </TabsContent>
              
              <TabsContent value="games" className="m-0">
                <ForumChat topic={gamesTopic} />
              </TabsContent>
              
              <TabsContent value="movies" className="m-0">
                <ForumChat topic={moviesTopic} />
              </TabsContent>
              
              <TabsContent value="sports" className="m-0">
                <ForumChat topic={sportsTopic} />
              </TabsContent>
              
              <TabsContent value="technology" className="m-0">
                <ForumChat topic={technologyTopic} />
              </TabsContent>
            </CardContent>
          </Tabs>
          
          <CardFooter className="bg-muted text-sm text-muted-foreground p-3">
            Please keep conversations respectful and follow our community guidelines.
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Forums;
