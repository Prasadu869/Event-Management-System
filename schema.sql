-- ======================================================
-- EventPulse Database Schema & Seed Data
-- ======================================================

CREATE DATABASE IF NOT EXISTS eventdb;
USE eventdb;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Events Table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL,
  image_url VARCHAR(1000),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- 4. Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  event_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- ======================================================
-- Initial Seed Data
-- ======================================================

-- Sample Users
-- Password for admin: admin123
-- Password for demo user: demo123
INSERT INTO users (id, username, email, password, role) VALUES
(1, 'AdminUser', 'admin@eventpulse.com', '$2a$10$Wv3LidjJ0GcfgUiXu7U2AeswyvspkoyaUdrVefBXbvGiXXdkqQhBa', 'admin'),
(2, 'AlexRivers', 'alex@eventpulse.com', '$2a$10$PopD4h7xN/YqqBOnW7LUc.QD8FZa0YtN4hPx0/7VTYYxd963xFNvu', 'user')
ON DUPLICATE KEY UPDATE password=VALUES(password);

-- Sample Events
INSERT INTO events (id, title, description, location, date, image_url) VALUES
(1, 'Global AI & Tech Expo 2026', 'Immerse yourself in cutting-edge developments in Artificial Intelligence, Quantum Computing, and Robotics featuring keynotes from industry pioneers.', 'Convention Center, Hall A, Tech District', '2026-11-15 09:30:00', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'),
(2, 'Neon Horizon Music Festival', 'A 2-day open-air music experience featuring international electronic, indie, and alternative artists with mesmerizing light shows.', 'Starlight Amphitheater, Waterfront', '2026-11-20 17:00:00', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80'),
(3, 'International Culinary & Wine Summit', 'Savor gourmet creations, participate in masterclasses led by Michelin-star chefs, and discover exquisite vintage pairings.', 'Grand Pavilion, Riverfront', '2026-11-28 11:00:00', 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80'),
(4, 'NextGen Startup Pitch Night', 'Watch 15 disruptive startups pitch to top venture capitalists and angel investors. Networking dinner and cocktail reception included.', 'Metropolitan Innovation Hub, Floor 14', '2026-12-05 18:00:00', 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80'),
(5, 'City Marathon & Wellness Fair', 'Run through scenic urban landscapes in 5K, 10K, and Half Marathon categories, followed by yoga sessions and nutrition booths.', 'City Central Park, North Gate', '2026-12-12 06:30:00', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80'),
(6, 'Modern Art & Design Biennale', 'An international showcase of contemporary installations, digital generative art, sculpture, and interactive visual architecture.', 'Center for Modern Arts, Gallery 3', '2026-12-18 10:00:00', 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&w=1200&q=80'),
(7, 'Cybersecurity & Cloud Defense Summit', 'Deep dive into zero-trust architectures, ethical hacking, threat intelligence, and next-gen cloud security strategies.', 'Silicon Auditorium, Cyber Park', '2027-01-10 09:00:00', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80'),
(8, 'Indie Game Developers Festival', 'Play unreleased indie titles, meet game designers, attend game development workshops, and participate in the annual showcase awards.', 'Pixel Arena & Exhibition Complex', '2027-01-22 10:30:00', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80')
ON DUPLICATE KEY UPDATE title=VALUES(title);

-- Sample Bookings
INSERT INTO bookings (id, user_id, event_id, booking_date) VALUES
(1, 2, 1, '2026-10-10 14:22:00'),
(2, 2, 2, '2026-10-12 09:15:00')
ON DUPLICATE KEY UPDATE booking_date=VALUES(booking_date);

-- Sample Feedback
INSERT INTO feedback (id, user_id, event_id, rating, comment, created_at) VALUES
(1, 2, 1, 5, 'Incredible speakers and flawless organization. Can not wait for the next edition!', '2026-10-14 11:00:00'),
(2, 2, 2, 4, 'Great music lineup and energetic vibes throughout the night!', '2026-10-14 16:30:00')
ON DUPLICATE KEY UPDATE rating=VALUES(rating);
