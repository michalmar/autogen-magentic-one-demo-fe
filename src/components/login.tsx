import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"; // Adjust the import paths as needed
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


interface LoginCardProps {
  handleLogin: () => void;
}

export const LoginCard: React.FC<LoginCardProps> = ({ handleLogin }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="password" />
            </div>
            <Button type="button" onClick={handleLogin}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};