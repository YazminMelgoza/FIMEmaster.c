import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "@rneui/themed";
import Avatar from "../../components/Avatar";
import { Tables } from "database.types";
import { router } from "expo-router";
import { UserService } from "../../services/user";
import { Toast } from "toastify-react-native";

import { Text } from 'react-native';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState<Tables<"users"> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getUser();
        if (sessionError) throw sessionError;

        const userId = sessionData?.user?.id;
        if (!userId) throw new Error("No user ID found");

        const { user: fetchedUser, error: fetchError } =
          await UserService.getUserProfileById(userId);
        if (fetchError) throw fetchError;

        setUser(fetchedUser);
        setUserEmail(sessionData.user.email || "");
      } catch (error) {
        Toast.error("Error fetching user.");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const updateProfile = async (updatedUser: Tables<"users">) => {
    try {
      setLoading(true);
      if (!updatedUser.id) throw new Error("No user on the session!");

      const error = await UserService.updateUserProfileById({
        ...updatedUser,
      });

      if (error) throw error;

      Alert.alert("Profile updated successfully");
    } catch (error) {
      Alert.alert(
        error instanceof Error ? error.message : "Error updating profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.container}><Text className="text-xl font-bold ">Loading...</Text></View>;
  }

  function updateUserState(user: Partial<Tables<"users">>) {
    setUser((prevUser) => ({
      ...prevUser!,
      ...user,
    }));
  }
  return (
    <View style={styles.container}>
      <Avatar
        size={200}
        url={user?.avatar_url || ""}
        onUpload={(url) =>
          updateUserState({
            avatar_url: url,
          })
        }
      />
      <Input label="Email" value={userEmail} disabled />
      <Input
        label="First Name"
        value={user?.firstname || ""}
        onChangeText={(text) =>
          updateUserState({
            firstname: text,
          })
        }
      />
      <Input
        label="Last Name"
        value={user?.lastname || ""}
        onChangeText={(text) =>
          updateUserState({
            lastname: text,
          })
        }
      />
      <Input
        label="Middle Name"
        value={user?.middlename || ""}
        onChangeText={(text) =>
          updateUserState({
            middlename: text,
          })
        }
      />
      <Button
        title={loading ? "Loading..." : "Update"}
        onPress={() => updateProfile(user!)}
        disabled={loading}
      />
      <Button
        title="Sign Out"
        onPress={() =>
          supabase.auth
            .signOut()
            .then(() => router.navigate("/"))
            .catch(console.error)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
});
