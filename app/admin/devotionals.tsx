// File: app/admin/devotionals.tsx

import React, { useState } from "react";
import { Alert } from "react-native";
import FormInput from "../../components/FormInput";
import PrimaryButton from "../../components/PrimaryButton";
import Screen from "../../components/Screen";
import SectionTitle from "../../components/SectionTitle";
import { useAuth } from "../../context/AuthContext";
import { createDevotional } from "../../services/devotionals";

export default function AdminDevotionalsScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    if (!title.trim() || !verse.trim() || !reference.trim() || !message.trim()) {
      Alert.alert("Missing fields", "Please fill all devotional fields.");
      return;
    }

    try {
      await createDevotional({
        title: title.trim(),
        verse: verse.trim(),
        reference: reference.trim(),
        message: message.trim(),
        language: "both",
        createdBy: user?.email || ""
      });

      setTitle("");
      setVerse("");
      setReference("");
      setMessage("");

      Alert.alert("Saved", "Daily devotional posted.");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Unable to save devotional.");
    }
  };

  return (
    <Screen>
      <SectionTitle title="Daily Devotional" />

      <FormInput label="Title" value={title} onChangeText={setTitle} placeholder="Word for Today" />
      <FormInput label="Verse" value={verse} onChangeText={setVerse} placeholder="Verse text" />
      <FormInput label="Reference" value={reference} onChangeText={setReference} placeholder="John 3:16" />
      <FormInput label="Message" value={message} onChangeText={setMessage} placeholder="Short devotional message" />

      <PrimaryButton title="Post Devotional" onPress={handleSave} />
    </Screen>
  );
}