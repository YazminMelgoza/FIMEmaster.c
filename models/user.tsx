// userModel.tsx
export type User = {
    id: string;             // UUID
    updated_at: string;     // Timestamp with time zone (usualmente se maneja como string)
    username: string;       // Texto
    first_name: string;     // Texto
    avatar_url?: string;    // Texto (opcional)
    website?: string;       // Texto (opcional)
    last_name?: string;     // Texto (opcional)
}
