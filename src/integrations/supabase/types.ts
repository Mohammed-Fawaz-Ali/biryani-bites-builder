export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_activity_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_tracking: {
        Row: {
          created_at: string | null
          current_location: Json | null
          delivery_agent_id: string | null
          estimated_arrival: string | null
          id: string
          notes: string | null
          order_id: string | null
          status: Database["public"]["Enums"]["delivery_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_location?: Json | null
          delivery_agent_id?: string | null
          estimated_arrival?: string | null
          id?: string
          notes?: string | null
          order_id?: string | null
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_location?: Json | null
          delivery_agent_id?: string | null
          estimated_arrival?: string | null
          id?: string
          notes?: string | null
          order_id?: string | null
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_delivery_agent_id_fkey"
            columns: ["delivery_agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "delivery_tracking_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      feature_flags: {
        Row: {
          config: Json | null
          created_at: string | null
          description: string | null
          flag_name: string
          id: string
          is_enabled: boolean | null
          target_users: Json | null
          updated_at: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          flag_name: string
          id?: string
          is_enabled?: boolean | null
          target_users?: Json | null
          updated_at?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          description?: string | null
          flag_name?: string
          id?: string
          is_enabled?: boolean | null
          target_users?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          admin_responded_at: string | null
          admin_responded_by: string | null
          admin_response: string | null
          comment: string | null
          comment_ar: string | null
          created_at: string | null
          customer_id: string | null
          delivery_rating: number | null
          food_quality_rating: number | null
          id: string
          is_positive: boolean | null
          order_id: string | null
          rating: number
          service_rating: number | null
        }
        Insert: {
          admin_responded_at?: string | null
          admin_responded_by?: string | null
          admin_response?: string | null
          comment?: string | null
          comment_ar?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivery_rating?: number | null
          food_quality_rating?: number | null
          id?: string
          is_positive?: boolean | null
          order_id?: string | null
          rating: number
          service_rating?: number | null
        }
        Update: {
          admin_responded_at?: string | null
          admin_responded_by?: string | null
          admin_response?: string | null
          comment?: string | null
          comment_ar?: string | null
          created_at?: string | null
          customer_id?: string | null
          delivery_rating?: number | null
          food_quality_rating?: number | null
          id?: string
          is_positive?: boolean | null
          order_id?: string | null
          rating?: number
          service_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_admin_responded_by_fkey"
            columns: ["admin_responded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "feedback_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_categories: {
        Row: {
          created_at: string | null
          description: string | null
          description_ar: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          name_ar: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          name_ar: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          name_ar?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      menu_item_addons: {
        Row: {
          created_at: string | null
          id: string
          is_available: boolean | null
          menu_item_id: string | null
          name: string
          name_ar: string | null
          price: number
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          menu_item_id?: string | null
          name: string
          name_ar?: string | null
          price?: number
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          menu_item_id?: string | null
          name?: string
          name_ar?: string | null
          price?: number
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_addons_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_item_analytics: {
        Row: {
          created_at: string | null
          id: string
          last_ordered_at: string | null
          menu_item_id: string | null
          total_orders: number | null
          total_revenue: number | null
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_ordered_at?: string | null
          menu_item_id?: string | null
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_ordered_at?: string | null
          menu_item_id?: string | null
          total_orders?: number | null
          total_revenue?: number | null
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_item_analytics_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          allergens: string[] | null
          calories: number | null
          category_id: string | null
          created_at: string | null
          customization_options: Json | null
          description: string | null
          description_ar: string | null
          dietary_tags: string[] | null
          draft: Json | null
          full_description: string | null
          id: string
          image_url: string | null
          images: Json | null
          include_service_charge: boolean | null
          include_tax: boolean | null
          ingredients: Json | null
          is_available: boolean | null
          is_chefs_special: boolean | null
          is_featured: boolean | null
          is_new_item: boolean | null
          is_out_of_stock: boolean | null
          meta_description: string | null
          meta_title: string | null
          name: string
          name_ar: string
          popularity_score: number | null
          preparation_time: number | null
          price: number
          promo_price: number | null
          rating: number | null
          review_count: number | null
          scheduled_publish_at: string | null
          short_description: string | null
          slug: string | null
          special_price: number | null
          spice_level: number | null
          stock_count: number | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          allergens?: string[] | null
          calories?: number | null
          category_id?: string | null
          created_at?: string | null
          customization_options?: Json | null
          description?: string | null
          description_ar?: string | null
          dietary_tags?: string[] | null
          draft?: Json | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          include_service_charge?: boolean | null
          include_tax?: boolean | null
          ingredients?: Json | null
          is_available?: boolean | null
          is_chefs_special?: boolean | null
          is_featured?: boolean | null
          is_new_item?: boolean | null
          is_out_of_stock?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          name_ar: string
          popularity_score?: number | null
          preparation_time?: number | null
          price: number
          promo_price?: number | null
          rating?: number | null
          review_count?: number | null
          scheduled_publish_at?: string | null
          short_description?: string | null
          slug?: string | null
          special_price?: number | null
          spice_level?: number | null
          stock_count?: number | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          allergens?: string[] | null
          calories?: number | null
          category_id?: string | null
          created_at?: string | null
          customization_options?: Json | null
          description?: string | null
          description_ar?: string | null
          dietary_tags?: string[] | null
          draft?: Json | null
          full_description?: string | null
          id?: string
          image_url?: string | null
          images?: Json | null
          include_service_charge?: boolean | null
          include_tax?: boolean | null
          ingredients?: Json | null
          is_available?: boolean | null
          is_chefs_special?: boolean | null
          is_featured?: boolean | null
          is_new_item?: boolean | null
          is_out_of_stock?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          name_ar?: string
          popularity_score?: number | null
          preparation_time?: number | null
          price?: number
          promo_price?: number | null
          rating?: number | null
          review_count?: number | null
          scheduled_publish_at?: string | null
          short_description?: string | null
          slug?: string | null
          special_price?: number | null
          spice_level?: number | null
          stock_count?: number | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          message: string
          message_ar: string | null
          template_name: string
          template_type: string
          title: string
          title_ar: string | null
          variables: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          message_ar?: string | null
          template_name: string
          template_type: string
          title: string
          title_ar?: string | null
          variables?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          message_ar?: string | null
          template_name?: string
          template_type?: string
          title?: string
          title_ar?: string | null
          variables?: Json | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          customizations: Json | null
          id: string
          item_name: string
          item_name_ar: string | null
          menu_item_id: string | null
          order_id: string | null
          quantity: number
          special_instructions: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          customizations?: Json | null
          id?: string
          item_name: string
          item_name_ar?: string | null
          menu_item_id?: string | null
          order_id?: string | null
          quantity: number
          special_instructions?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          customizations?: Json | null
          id?: string
          item_name?: string
          item_name_ar?: string | null
          menu_item_id?: string | null
          order_id?: string | null
          quantity?: number
          special_instructions?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_menu_item_id_fkey"
            columns: ["menu_item_id"]
            isOneToOne: false
            referencedRelation: "menu_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_delivery_time: string | null
          admin_notes: string | null
          created_at: string | null
          customer_id: string | null
          customer_notes: string | null
          delivery_address: Json | null
          delivery_agent_id: string | null
          delivery_fee: number | null
          delivery_instructions: string | null
          discount_amount: number | null
          estimated_delivery_time: string | null
          feedback_comment: string | null
          id: string
          order_number: string
          order_type: string | null
          payment_id: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          preparation_time: number | null
          rating: number | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          actual_delivery_time?: string | null
          admin_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_notes?: string | null
          delivery_address?: Json | null
          delivery_agent_id?: string | null
          delivery_fee?: number | null
          delivery_instructions?: string | null
          discount_amount?: number | null
          estimated_delivery_time?: string | null
          feedback_comment?: string | null
          id?: string
          order_number: string
          order_type?: string | null
          payment_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          preparation_time?: number | null
          rating?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          actual_delivery_time?: string | null
          admin_notes?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_notes?: string | null
          delivery_address?: Json | null
          delivery_agent_id?: string | null
          delivery_fee?: number | null
          delivery_instructions?: string | null
          discount_amount?: number | null
          estimated_delivery_time?: string | null
          feedback_comment?: string | null
          id?: string
          order_number?: string
          order_type?: string | null
          payment_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          preparation_time?: number | null
          rating?: number | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_delivery_agent_id_fkey"
            columns: ["delivery_agent_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          accessibility_requests: string | null
          auto_assign_table: boolean | null
          completed_at: string | null
          created_at: string | null
          customer_id: string | null
          customer_email: string | null
          customer_name: string
          customer_phone: string
          deposit_amount: number | null
          deposit_paid: boolean | null
          dietary_restrictions: unknown | null
          id: string
          party_size: number
          pre_order_items: unknown | null
          reminder_sent: boolean | null
          reservation_date: string
          reservation_number: string
          reservation_time: string
          seated_at: string | null
          special_occasion: Database["public"]["Enums"]["special_occasion"] | null
          special_requests: string | null
          status: Database["public"]["Enums"]["reservation_status"] | null
          table_id: string | null
          table_number: string | null
          updated_at: string | null
        }
        Insert: {
          accessibility_requests?: string | null
          auto_assign_table?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_email?: string | null
          customer_name: string
          customer_phone: string
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          dietary_restrictions?: unknown | null
          id?: string
          party_size: number
          pre_order_items?: unknown | null
          reminder_sent?: boolean | null
          reservation_date: string
          reservation_number: string
          reservation_time: string
          seated_at?: string | null
          special_occasion?: Database["public"]["Enums"]["special_occasion"] | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["reservation_status"] | null
          table_id?: string | null
          table_number?: string | null
          updated_at?: string | null
        }
        Update: {
          accessibility_requests?: string | null
          auto_assign_table?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string | null
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string
          deposit_amount?: number | null
          deposit_paid?: boolean | null
          dietary_restrictions?: unknown | null
          id?: string
          party_size?: number
          pre_order_items?: unknown | null
          reminder_sent?: boolean | null
          reservation_date?: string
          reservation_number?: string
          reservation_time?: string
          seated_at?: string | null
          special_occasion?: Database["public"]["Enums"]["special_occasion"] | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["reservation_status"] | null
          table_id?: string | null
          table_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_table_id_fkey"
            columns: ["table_id"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          customer_id: string | null
          customizations: Json | null
          delivery_address: Json | null
          delivery_frequency: number | null
          description: string | null
          description_ar: string | null
          end_date: string | null
          id: string
          menu_items: Json | null
          next_delivery_date: string | null
          pause_until: string | null
          plan_name: string
          plan_name_ar: string | null
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          price_per_cycle: number
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          customizations?: Json | null
          delivery_address?: Json | null
          delivery_frequency?: number | null
          description?: string | null
          description_ar?: string | null
          end_date?: string | null
          id?: string
          menu_items?: Json | null
          next_delivery_date?: string | null
          pause_until?: string | null
          plan_name: string
          plan_name_ar?: string | null
          plan_type: Database["public"]["Enums"]["subscription_plan"]
          price_per_cycle: number
          start_date: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          customizations?: Json | null
          delivery_address?: Json | null
          delivery_frequency?: number | null
          description?: string | null
          description_ar?: string | null
          end_date?: string | null
          id?: string
          menu_items?: Json | null
          next_delivery_date?: string | null
          pause_until?: string | null
          plan_name?: string
          plan_name_ar?: string | null
          plan_type?: Database["public"]["Enums"]["subscription_plan"]
          price_per_cycle?: number
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          capacity: number
          created_at: string | null
          id: string
          is_available: boolean | null
          position_x: number | null
          position_y: number | null
          table_number: string
          table_type: Database["public"]["Enums"]["table_type"] | null
          updated_at: string | null
        }
        Insert: {
          capacity: number
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          position_x?: number | null
          position_y?: number | null
          table_number: string
          table_type?: Database["public"]["Enums"]["table_type"] | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          position_x?: number | null
          position_y?: number | null
          table_number?: string
          table_type?: Database["public"]["Enums"]["table_type"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string | null
          id: string
          is_available: boolean | null
          max_capacity: number | null
          slot_time: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          max_capacity?: number | null
          slot_time: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          max_capacity?: number | null
          slot_time?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: number
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          address: Json | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          full_name_ar: string | null
          id: string
          is_active: boolean | null
          last_login_at: string | null
          phone: string | null
          preferences: Json | null
          updated_at: string | null
          user_type: Database["public"]["Enums"]["user_type"] | null
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          full_name_ar?: string | null
          id: string
          is_active?: boolean | null
          last_login_at?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          full_name_ar?: string | null
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          phone?: string | null
          preferences?: Json | null
          updated_at?: string | null
          user_type?: Database["public"]["Enums"]["user_type"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_reservation_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_slug: {
        Args: { input_text: string }
        Returns: string
      }
      get_available_tables: {
        Args: {
          reservation_date: string
          reservation_time: string
          party_size: number
        }
        Returns: {
          id: string
          table_number: string
          table_type: Database["public"]["Enums"]["table_type"]
          capacity: number
          position_x: number
          position_y: number
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_type"]
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
      is_delivery_agent: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      delivery_status: "assigned" | "picked_up" | "in_transit" | "delivered"
      order_status:
        | "pending"
        | "confirmed"
        | "preparing"
        | "ready"
        | "out_for_delivery"
        | "delivered"
        | "cancelled"
      payment_method: "cash" | "card" | "mobile_wallet" | "online"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      reservation_status:
        | "pending"
        | "confirmed"
        | "seated"
        | "completed"
        | "cancelled"
        | "no_show"
      special_occasion:
        | "anniversary"
        | "birthday"
        | "business_lunch"
        | "date_night"
        | "family_gathering"
        | "other"
      subscription_plan: "weekly" | "monthly" | "custom"
      subscription_status: "active" | "paused" | "cancelled" | "expired"
      table_type:
        | "two_top"
        | "four_top"
        | "six_top"
        | "eight_top"
        | "booth"
        | "bar"
        | "private_room"
      user_type: "customer" | "admin" | "delivery_agent" | "manager"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      delivery_status: ["assigned", "picked_up", "in_transit", "delivered"],
      order_status: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      payment_method: ["cash", "card", "mobile_wallet", "online"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      reservation_status: [
        "pending",
        "confirmed",
        "seated",
        "completed",
        "cancelled",
        "no_show",
      ],
      special_occasion: [
        "anniversary",
        "birthday",
        "business_lunch",
        "date_night",
        "family_gathering",
        "other",
      ],
      subscription_plan: ["weekly", "monthly", "custom"],
      subscription_status: ["active", "paused", "cancelled", "expired"],
      table_type: [
        "two_top",
        "four_top",
        "six_top",
        "eight_top",
        "booth",
        "bar",
        "private_room",
      ],
      user_type: ["customer", "admin", "delivery_agent", "manager"],
    },
  },
} as const
