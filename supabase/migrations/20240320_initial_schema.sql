-- Create tables for the Tours & Travel Management System

-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-super-secret-jwt-token-with-at-least-32-characters-long';
ALTER DATABASE postgres SET "app.jwt_exp" TO 3600;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  UNIQUE(user_id)
);

-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration INTEGER NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 0,
  start_date DATE NOT NULL,
  max_group_size INTEGER NOT NULL
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE NOT NULL,
  booking_date DATE NOT NULL,
  participants INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled'))
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  UNIQUE(user_id, tour_id)
);

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Tours policies (public read, admin write)
CREATE POLICY "Tours are viewable by everyone."
  ON tours FOR SELECT
  USING (true);

-- Bookings policies
CREATE POLICY "Users can view own bookings."
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings."
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings."
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone."
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own reviews."
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews."
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample data for tours
INSERT INTO tours (title, description, image, price, duration, location, rating, start_date, max_group_size)
VALUES
  ('Alpine Adventure', 'Experience the majestic Swiss Alps with guided hiking tours and luxury accommodations.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', 2499, 7, 'Switzerland', 4.8, '2023-07-15', 12),
  ('Tropical Paradise', 'Relax on pristine beaches and explore vibrant coral reefs in this island getaway.', 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80', 1899, 5, 'Maldives', 4.9, '2023-08-10', 8),
  ('Historic Rome Tour', 'Walk through ancient history with expert guides showcasing the wonders of the Eternal City.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80', 1299, 4, 'Italy', 4.7, '2023-09-05', 15),
  ('Safari Adventure', 'Witness the incredible wildlife of Africa on this unforgettable safari experience.', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', 3299, 8, 'Kenya', 4.9, '2023-10-20', 10),
  ('Japanese Culture Tour', 'Immerse yourself in the rich traditions and modern wonders of Japan.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80', 2799, 10, 'Japan', 4.8, '2023-11-12', 12),
  ('Northern Lights Expedition', 'Chase the aurora borealis across the Arctic Circle in this magical winter tour.', 'https://images.unsplash.com/photo-1579033385971-a7bc023a7298?w=800&q=80', 3499, 6, 'Iceland', 4.7, '2023-12-05', 8),
  ('Amazon Rainforest Expedition', 'Explore the world''s most biodiverse ecosystem with expert naturalist guides.', 'https://images.unsplash.com/photo-1601000785686-c45240e25f25?w=800&q=80', 2199, 9, 'Brazil', 4.6, '2024-01-15', 10),
  ('Greek Island Hopping', 'Discover the beauty of Santorini, Mykonos, and other stunning Greek islands.', 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80', 1899, 8, 'Greece', 4.8, '2024-02-10', 14);
