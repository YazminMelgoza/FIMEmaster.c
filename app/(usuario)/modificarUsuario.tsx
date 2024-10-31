import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "@rneui/themed";
import Avatar from "../../components/Avatar";
import { Tables } from "database.types";
import { router } from "expo-router";
import { UserService } from "../../services/user";
import { User } from "@supabase/supabase-js";
import { Toast } from "toastify-react-native";

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [user, setUser] = useState<Tables<"users"> | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error: sessionError } = await supabase.auth.getUser();
      const { user, error: fetchError } = await UserService.getUserProfileById(
        (
          await supabase.auth.getUser()
        ).data?.user?.id!
      );

      if (!user || fetchError || sessionError) {
        Toast.error("Error al obtener el usuario.");
        console.error(
          "Error al obtener el usuario:",
          fetchError || sessionError
        );
        return;
      }

      setUser(user);
      setUserEmail(data.user.email || "");
    };
    fetchUser();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      if (!user?.userId) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("users")
        .select(
          `username, website, avatar_url, updated_at,firstname,lastname,middlename`
        )
        .eq("userId", user.userId)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUser((prevUser) => ({
          ...prevUser!,
          updated_at: data.updated_at,
          username: data.username,
          firstname: data.firstname,
          avatar_url: data.avatar_url,
          website: data.website,
          lastname: data.lastname,
          middlename: data.middlename,
        }));
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      console.log(user);
      setLoading(false);
    }
  }

  async function updateProfile(user: Tables<"users">) {
    try {
      setLoading(true);
      if (user.userId === "") throw new Error("No user on the session!");
      const { middlename, ...userProfile } = user;

      const error = await UserService.updateUserProfileById(user);
      if (!error) {
        console.log("Perfil actualizado correctamente");
        Alert.alert("Perfil actualizado correctamente");
      } else {
        console.error("Error al actualizar el perfil:", error);
        Alert.alert("Error al actualizar el perfil...");
      }

      // Lanza el error si ocurrió
      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message); // Muestra una alerta con el mensaje de error
      }
    } finally {
      setLoading(false);
    }
  }
  if (!user) {
    return <View style={styles.container}>Cargando...</View>;
  }

  return (
    <View style={styles.container}>
      <View>
        <Avatar
          size={200}
          url={user.avatar_url || ""}
          onUpload={(url: string) => {
            setUser((prevUser) => ({
              ...prevUser!,
              avatar_url: url,
            }));
            //updateProfile({ username, website, avatar_url: url });
          }}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={userEmail} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Nombre"
          value={user.firstname || ""}
          onChangeText={(text) =>
            setUser((prevUser) => ({
              ...prevUser!,
              firstname: text,
            }))
          }
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Apellido Paterno"
          value={user.lastname || ""}
          onChangeText={(text) =>
            setUser((prevUser) => ({
              ...prevUser!,
              lastname: text,
            }))
          }
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Apellido Materno"
          value={user.middlename || ""}
          onChangeText={(text) =>
            setUser((prevUser) => ({
              ...prevUser!,
              middlename: text,
            }))
          }
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Cargando ..." : "Actualizar"}
          onPress={() => updateProfile(user)}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="Sign Out"
          onPress={() => {
            supabase.auth
              .signOut()
              .then(() => {
                console.log("Signed out");
                router.navigate("/");
              })
              .catch(console.error);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
