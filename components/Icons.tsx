import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ComponentProps } from "react";

// Asegúrate de que estas propiedades son las que esperas recibir
export const HomeIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="home" size={32} {...props} />
);

export const InfoIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="info" size={32} {...props} />
);


