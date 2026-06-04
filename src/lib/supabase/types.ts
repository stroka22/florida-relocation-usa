export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // Geographic Entities
      counties: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          population: number | null
          median_income: number | null
          cost_of_living_index: number | null
          property_tax_rate: number | null
          meta_title: string | null
          meta_description: string | null
          hero_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['counties']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['counties']['Insert']>
      }

      cities: {
        Row: {
          id: string
          county_id: string | null
          name: string
          slug: string
          tagline: string | null
          overview: string | null
          population: number | null
          median_home_price: number | null
          median_rent: number | null
          median_income: number | null
          unemployment_rate: number | null
          cost_of_living_index: number | null
          walkability_score: number | null
          bike_score: number | null
          transit_score: number | null
          crime_index: number | null
          weather_summary: string | null
          avg_high_summer: number | null
          avg_low_winter: number | null
          annual_rainfall: number | null
          pros: string[] | null
          cons: string[] | null
          lifestyle_tags: string[] | null
          best_for: string[] | null
          faq: Json | null
          hero_image_url: string | null
          gallery_images: string[] | null
          video_url: string | null
          latitude: number | null
          longitude: number | null
          meta_title: string | null
          meta_description: string | null
          schema_markup: Json | null
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['cities']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['cities']['Insert']>
      }

      neighborhoods: {
        Row: {
          id: string
          city_id: string
          name: string
          slug: string
          type: 'master_planned' | 'traditional' | 'retirement' | 'golf' | 'waterfront' | 'luxury' | 'historic' | 'suburban'
          tagline: string | null
          overview: string | null
          year_established: number | null
          total_homes: number | null
          min_home_price: number | null
          max_home_price: number | null
          median_home_price: number | null
          hoa_fee_min: number | null
          hoa_fee_max: number | null
          has_cdd: boolean
          cdd_fee: number | null
          home_styles: string[] | null
          lot_sizes: string | null
          builder_names: string[] | null
          amenities: string[] | null
          school_district: string | null
          elementary_school: string | null
          middle_school: string | null
          high_school: string | null
          nearby_shopping: string[] | null
          nearby_dining: string[] | null
          nearby_healthcare: string[] | null
          commute_times: Json | null
          pros: string[] | null
          cons: string[] | null
          best_for: string[] | null
          faq: Json | null
          hero_image_url: string | null
          gallery_images: string[] | null
          video_url: string | null
          virtual_tour_url: string | null
          latitude: number | null
          longitude: number | null
          meta_title: string | null
          meta_description: string | null
          schema_markup: Json | null
          is_featured: boolean
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['neighborhoods']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['neighborhoods']['Insert']>
      }

      schools: {
        Row: {
          id: string
          city_id: string | null
          neighborhood_id: string | null
          name: string
          slug: string
          type: 'elementary' | 'middle' | 'high' | 'k8' | 'k12' | 'charter' | 'private' | 'magnet'
          grade_range: string | null
          district: string | null
          address: string | null
          phone: string | null
          website: string | null
          enrollment: number | null
          student_teacher_ratio: number | null
          overall_rating: number | null
          academic_rating: number | null
          test_scores_rating: number | null
          college_readiness: number | null
          athletics: string[] | null
          extracurriculars: string[] | null
          overview: string | null
          pros: string[] | null
          cons: string[] | null
          hero_image_url: string | null
          gallery_images: string[] | null
          latitude: number | null
          longitude: number | null
          meta_title: string | null
          meta_description: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['schools']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['schools']['Insert']>
      }

      // Agent/Realtor System
      agents: {
        Row: {
          id: string
          user_id: string | null
          first_name: string
          last_name: string
          email: string
          phone: string | null
          license_number: string | null
          brokerage: string | null
          bio: string | null
          tagline: string | null
          specializations: string[] | null
          years_experience: number | null
          total_sales: number | null
          languages: string[] | null
          certifications: string[] | null
          avatar_url: string | null
          cover_image_url: string | null
          video_intro_url: string | null
          website: string | null
          social_links: Json | null
          is_verified: boolean
          is_premium: boolean
          subscription_tier: 'free' | 'basic' | 'premium' | 'elite'
          subscription_expires_at: string | null
          meta_title: string | null
          meta_description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['agents']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['agents']['Insert']>
      }

      agent_sponsorships: {
        Row: {
          id: string
          agent_id: string
          sponsorship_type: 'city' | 'neighborhood' | 'county' | 'school_district'
          entity_id: string
          entity_name: string
          position: number
          price_monthly: number | null
          starts_at: string
          expires_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['agent_sponsorships']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['agent_sponsorships']['Insert']>
      }

      // Lead Management
      leads: {
        Row: {
          id: string
          source_page: string
          source_type: 'contact_form' | 'consultation' | 'mortgage_quote' | 'relocation_request' | 'community_info' | 'school_info'
          first_name: string
          last_name: string
          email: string
          phone: string | null
          message: string | null
          moving_timeline: string | null
          budget_range: string | null
          family_size: number | null
          interests: string[] | null
          preferred_areas: string[] | null
          assigned_agent_id: string | null
          status: 'new' | 'contacted' | 'qualified' | 'nurturing' | 'converted' | 'lost'
          notes: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }

      // Content Management
      articles: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          category: 'relocation' | 'cost_of_living' | 'real_estate' | 'lifestyle' | 'schools' | 'retirement' | 'employment' | 'healthcare' | 'weather' | 'guide'
          tags: string[] | null
          author_name: string | null
          hero_image_url: string | null
          related_city_ids: string[] | null
          related_neighborhood_ids: string[] | null
          meta_title: string | null
          meta_description: string | null
          schema_markup: Json | null
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['articles']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['articles']['Insert']>
      }

      // Media Management
      media: {
        Row: {
          id: string
          entity_type: 'city' | 'neighborhood' | 'school' | 'article' | 'agent'
          entity_id: string
          type: 'image' | 'video' | 'virtual_tour'
          url: string
          thumbnail_url: string | null
          title: string | null
          alt_text: string | null
          caption: string | null
          sort_order: number
          is_hero: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['media']['Insert']>
      }

      // User Favorites & Saved Searches (Future)
      user_favorites: {
        Row: {
          id: string
          user_id: string
          entity_type: 'city' | 'neighborhood' | 'school' | 'article'
          entity_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_favorites']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['user_favorites']['Insert']>
      }

      saved_searches: {
        Row: {
          id: string
          user_id: string
          name: string
          criteria: Json
          notifications_enabled: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['saved_searches']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['saved_searches']['Insert']>
      }

      // AI Content Generation Queue
      content_generation_queue: {
        Row: {
          id: string
          entity_type: 'city' | 'neighborhood' | 'school' | 'article'
          entity_id: string
          content_type: 'overview' | 'pros_cons' | 'faq' | 'meta' | 'social' | 'video_script'
          status: 'pending' | 'processing' | 'completed' | 'failed'
          prompt: string | null
          result: string | null
          error: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['content_generation_queue']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['content_generation_queue']['Insert']>
      }
    }
  }
}

// Convenience types
export type County = Database['public']['Tables']['counties']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type Neighborhood = Database['public']['Tables']['neighborhoods']['Row']
export type School = Database['public']['Tables']['schools']['Row']
export type Agent = Database['public']['Tables']['agents']['Row']
export type AgentSponsorship = Database['public']['Tables']['agent_sponsorships']['Row']
export type Lead = Database['public']['Tables']['leads']['Row']
export type Article = Database['public']['Tables']['articles']['Row']
export type Media = Database['public']['Tables']['media']['Row']
