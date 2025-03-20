import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfilePage = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        isAuthenticated={!!user}
        userName={user?.name || "User"}
        userAvatar={user?.avatar_url}
      />
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center">
              <Avatar className="h-20 w-20 mr-6">
                <AvatarImage src={user?.avatar_url} alt={user?.name} />
                <AvatarFallback className="text-lg">
                  {user?.name?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  {user?.name || "User Profile"}
                </h1>
                <p className="text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                className="ml-auto"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>

            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
                <TabsTrigger value="reviews">My Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Bookings</CardTitle>
                    <CardDescription>
                      View and manage your tour bookings here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You don't have any bookings yet.
                      </p>
                      <Button className="mt-4" asChild>
                        <a href="/tours">Browse Tours</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Account settings will be available soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Reviews</CardTitle>
                    <CardDescription>
                      Reviews you've left for tours you've taken.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You haven't written any reviews yet.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
