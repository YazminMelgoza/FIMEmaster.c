import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ComponentProps } from "react";

// Asegúrate de que estas propiedades son las que esperas recibir
export const HomeIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="home" size={28} {...props} />
);
// Componente para el ícono de Búsqueda
export const SearchIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="search" size={28} {...props} />
);

// Componente para el ícono de Almacenamiento
export const StorageIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="book" size={28} {...props} />
);

// Componente para el ícono de Cuenta
export const AccountIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="user" size={28} {...props} />
);

export const InfoIcon = ({ name, ...props }: ComponentProps<typeof FontAwesome>) => (
  <FontAwesome name="info" size={28} {...props} />
);


