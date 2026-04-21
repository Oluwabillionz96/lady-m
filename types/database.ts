export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      gallery_photos: {
        Row: {
          id: string;
          image_url: string;
          title: string;
          category: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          title: string;
          category: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          title?: string;
          category?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          role: string;
          text: string;
          photo_url: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string;
          text: string;
          photo_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          text?: string;
          photo_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      metrics: {
        Row: {
          id: string;
          value: string;
          label: string;
        };
        Insert: {
          id?: string;
          value: string;
          label: string;
        };
        Update: {
          id?: string;
          value?: string;
          label?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
