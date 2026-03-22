"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onError: () => {
          window.alert("Error");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      },
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Error");
        },
        onSuccess: () => {
          window.alert("Success");
        },
      },
    );
  };

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-5">
        <p>Hello {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-9">
      <div className="p-4 flex flex-col gap-y-4 ">
        <Input
          placeholder="name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onSubmit}>Create User</Button>
      </div>
      <div>
        <Input
          placeholder="Email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Page;
