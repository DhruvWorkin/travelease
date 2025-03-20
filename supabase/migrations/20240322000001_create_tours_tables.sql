-- Create tours table
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration INTEGER NOT NULL,
  location TEXT NOT NULL,
  rating DECIMAL(3, 1) DEFAULT 0,
  start_date DATE NOT NULL,
  max_group_size INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  num_participants INTEGER NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for all tables
alter publication supabase_realtime add table tours;
alter publication supabase_realtime add table bookings;
alter publication supabase_realtime add table reviews;
alter publication supabase_realtime add table profiles;

-- Create trigger to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tours_updated_at
BEFORE UPDATE ON tours
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Create trigger to create profile after user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_id, name, avatar_url)
  VALUES (NEW.id, NEW.id, NEW.raw_user_meta_data->>'name', NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- Insert sample tour data
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