-- Kivu Gateway — schema, RLS policies and starter data
-- Run this once in Supabase Dashboard → SQL Editor → New Query → Run

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  city text not null,
  tagline text not null,
  description text not null,
  images text[] not null default '{}',
  phone text not null,
  whatsapp text,
  email text,
  website text,
  hours text,
  address text not null,
  tier text not null default 'free' check (tier in ('free', 'featured')),
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  city text not null,
  date date not null,
  time text not null,
  venue text not null,
  category text not null,
  organizer text,
  price_info text,
  description text not null,
  image text not null,
  created_at timestamptz not null default now()
);

create table if not exists opportunities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  org text not null,
  type text not null check (type in ('Job', 'Tender')),
  employment_type text,
  city text not null,
  deadline date not null,
  posted_date date not null,
  compensation text,
  description text not null,
  contact text not null,
  apply_link text,
  created_at timestamptz not null default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  cover_image text not null,
  excerpt text not null,
  body text not null,
  author text not null,
  published_date date not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists listing_submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('business', 'job', 'event', 'article')),
  payload jsonb not null,
  contact_name text not null,
  contact_info text not null,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table businesses enable row level security;
alter table events enable row level security;
alter table opportunities enable row level security;
alter table articles enable row level security;
alter table listing_submissions enable row level security;

-- businesses: public read, admin write
create policy "businesses_public_read" on businesses for select using (true);
create policy "businesses_admin_write" on businesses for insert to authenticated with check (true);
create policy "businesses_admin_update" on businesses for update to authenticated using (true) with check (true);
create policy "businesses_admin_delete" on businesses for delete to authenticated using (true);

-- events: public read, admin write
create policy "events_public_read" on events for select using (true);
create policy "events_admin_write" on events for insert to authenticated with check (true);
create policy "events_admin_update" on events for update to authenticated using (true) with check (true);
create policy "events_admin_delete" on events for delete to authenticated using (true);

-- opportunities: public read, admin write
create policy "opportunities_public_read" on opportunities for select using (true);
create policy "opportunities_admin_write" on opportunities for insert to authenticated with check (true);
create policy "opportunities_admin_update" on opportunities for update to authenticated using (true) with check (true);
create policy "opportunities_admin_delete" on opportunities for delete to authenticated using (true);

-- articles: public read (published only), admin sees & writes everything
create policy "articles_public_read_published" on articles for select using (published = true);
create policy "articles_admin_read_all" on articles for select to authenticated using (true);
create policy "articles_admin_write" on articles for insert to authenticated with check (true);
create policy "articles_admin_update" on articles for update to authenticated using (true) with check (true);
create policy "articles_admin_delete" on articles for delete to authenticated using (true);

-- listing_submissions: anyone can submit, only admin can read/manage
grant insert on listing_submissions to anon;
create policy "submissions_public_insert" on listing_submissions for insert to anon, authenticated with check (true);
create policy "submissions_admin_read" on listing_submissions for select to authenticated using (true);
create policy "submissions_admin_update" on listing_submissions for update to authenticated using (true) with check (true);
create policy "submissions_admin_delete" on listing_submissions for delete to authenticated using (true);

-- ============================================================
-- SEED DATA (matches what's currently on the live site)
-- ============================================================

insert into businesses (name, category, city, tagline, description, images, phone, whatsapp, email, website, hours, address, tier) values
('Lac Kivu Lodge', 'Stay', 'Gisenyi', 'Lakefront rooms with private balconies',
 'A lakefront lodge on the Gisenyi shoreline with private balconies, an on-site restaurant and easy access to the Goma border crossing.',
 array['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=55','https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=55'],
 '+250 788 100 201', 'https://wa.me/250788100201', 'stay@lackivulodge.rw', 'https://lackivulodge.rw', 'Check-in from 14:00 · Check-out by 11:00', 'Lake Kivu Road, Gisenyi, Rwanda', 'featured'),
('Ihusi Business Hotel', 'Stay', 'Goma', 'Conference-ready hotel in central Goma',
 'A business-focused hotel near central Goma with meeting rooms, reliable power/internet, and airport pickup for visiting investors.',
 array['https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=900&q=55','https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=55'],
 '+243 990 100 202', 'https://wa.me/243990100202', null, 'https://ihusihotel.cd', 'Front desk open 24 hours', 'Boulevard Kanyamuhanga, Goma, DR Congo', 'featured'),
('Chez Doga Restaurant', 'Food & Drink', 'Goma', 'Congolese classics with a lake view terrace',
 'Family-run restaurant serving Congolese classics and grilled fish on a terrace overlooking Lake Kivu.',
 array['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=55'],
 '+243 990 100 203', 'https://wa.me/243990100203', null, null, 'Daily 11:00 – 22:00', 'Avenue du Lac, Goma, DR Congo', 'free'),
('Paillote Café', 'Food & Drink', 'Gisenyi', 'Coffee, pastries and reliable Wi-Fi',
 'A relaxed café near the beach with strong coffee, pastries and dependable Wi-Fi — popular with remote workers.',
 array['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=55'],
 '+250 788 100 204', null, null, null, null, 'Rue du Lac, Gisenyi, Rwanda', 'free'),
('Kivu Legal & Tax Advisors', 'Professional Services', 'Goma', 'Business registration, tax and legal support',
 'Local advisors handling business registration, tax compliance and legal support for entrepreneurs setting up in Goma and North Kivu.',
 array['https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=900&q=55'],
 '+243 990 100 205', null, 'info@kivulegaltax.cd', null, null, 'Avenue Mulamba, Goma, DR Congo', 'featured'),
('Grands Lacs Real Estate', 'Real Estate', 'Gisenyi', 'Apartments, plots and commercial space',
 'Property agency covering apartment rentals, land and commercial space across Gisenyi and the Lake Kivu shoreline.',
 array['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=55'],
 '+250 788 100 206', null, null, null, null, 'KN 1 Rd, Gisenyi, Rwanda', 'free'),
('Kivu Cross-Border Logistics', 'Transport & Logistics', 'Goma', 'Freight and customs clearance, Gisenyi–Goma',
 'Freight, customs clearance and last-mile delivery for goods moving between Gisenyi and Goma.',
 array['https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=45'],
 '+243 990 100 207', 'https://wa.me/243990100207', null, null, null, 'Grande Barrière, Goma, DR Congo', 'free'),
('Great Lakes Safaris & Trekking', 'Tour Operators', 'Gisenyi', 'Gorilla trekking and Virunga excursions',
 'Licensed operator arranging gorilla trekking permits, Virunga excursions and Lake Kivu boat trips.',
 array['https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=900&q=50'],
 '+250 788 100 208', 'https://wa.me/250788100208', 'trips@greatlakessafaris.rw', null, null, 'Lake Kivu Road, Gisenyi, Rwanda', 'featured'),
('Boutique Amani', 'Retail & Shopping', 'Goma', 'Local fashion and handmade goods',
 'A boutique carrying local fashion, textiles and handmade goods from North Kivu artisans.',
 array['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=55'],
 '+243 990 100 209', null, null, null, null, 'Avenue du Marché, Goma, DR Congo', 'free'),
('Villa Karisimbi Guesthouse', 'Stay', 'Goma', 'Quiet guesthouse near the border crossing',
 'A small guesthouse a short walk from the Grande Barrière crossing, popular with cross-border business travelers.',
 array['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=55'],
 '+243 990 100 210', null, null, null, null, 'Near Grande Barrière, Goma, DR Congo', 'free');

insert into events (title, city, date, time, venue, category, organizer, price_info, description, image) values
('Goma Business & Trade Forum', 'Goma', '2026-10-14', '09:00', 'Ihusi Business Hotel, Goma', 'Business & Networking', 'Kivu Gateway', '10,000 RWF (includes lunch)',
 'A one-day forum connecting entrepreneurs, investors and NGOs working across North Kivu, with panels on cross-border trade and financing.',
 'https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=900&q=55'),
('Lake Kivu Music Night', 'Gisenyi', '2026-09-27', '18:30', 'Lakeside grounds, Gisenyi', 'Music & Entertainment', 'Gisenyi Cultural Collective', 'Free entry',
 'An evening of live Rwandan and Congolese music on the Gisenyi shoreline, with food stalls from local restaurants.',
 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=50'),
('Cross-Border Trade Expo', 'Goma', '2026-11-05', '10:00', 'Grande Barrière Exhibition Grounds, Goma', 'Business & Networking', null, null,
 'Traders and suppliers from both sides of the Gisenyi–Goma border showcase goods and meet distributors.',
 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=45'),
('Gisenyi Beach Cleanup & Community Day', 'Gisenyi', '2026-09-20', '08:00', 'Gisenyi Public Beach', 'Community', null, null,
 'A community cleanup along the Lake Kivu shoreline followed by games and a shared meal — open to all.',
 'https://images.unsplash.com/photo-1589715718565-223fdf9b7cd4?auto=format&fit=crop&w=900&q=55'),
('Virunga Conservation Talk', 'Goma', '2026-10-02', '17:00', 'Alliance Française de Goma', 'Culture & Conservation', null, null,
 'Park rangers and researchers share updates on gorilla conservation efforts and how tourism supports the park.',
 'https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=900&q=50');

insert into opportunities (title, org, type, employment_type, city, deadline, posted_date, compensation, description, contact, apply_link) values
('Program Officer — Livelihoods', 'Grands Lacs Relief Alliance', 'Job', 'Full-time', 'Goma', '2026-09-30', '2026-09-01', 'Competitive, based on experience',
 'Coordinate livelihoods programming for displaced households in North Kivu. 2+ years NGO experience required, French essential.',
 'careers@grandslacsrelief.org', 'https://grandslacsrelief.org/careers'),
('Supply of Office Equipment & IT Hardware', 'North Kivu Health Coalition', 'Tender', null, 'Goma', '2026-09-25', '2026-09-03', null,
 'Open tender for the supply and installation of office furniture, laptops and networking equipment for two clinic offices in Goma.',
 'procurement@nkhealthcoalition.org', null),
('Business Development Associate', 'Kivu Gateway', 'Job', 'Part-time', 'Gisenyi', '2026-10-10', '2026-09-05', 'Paid, negotiable',
 'Help grow our business directory across Gisenyi and Goma — onboarding local businesses, verifying listings and supporting events.',
 'kivugateway@gmail.com', null),
('Construction of Community Borehole', 'Eastern DRC WASH Initiative', 'Tender', null, 'Masisi', '2026-10-18', '2026-09-04', null,
 'Tender for the drilling and installation of a community borehole and hand pump serving three villages in Masisi territory.',
 'tenders@easterndrcwash.org', null);

insert into articles (title, slug, category, cover_image, excerpt, body, author, published_date, published) values
('5 Best Cafés in Gisenyi for Remote Work', 'best-cafes-gisenyi-remote-work', 'Food & Cafés',
 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=55',
 'Reliable Wi-Fi, good coffee and a lake view — here is where to set up for the day in Gisenyi.',
 E'Gisenyi has quietly become a favourite for people who want to work near the water without the noise of a big city. A few spots stand out for combining strong Wi-Fi with good coffee and a view worth looking up for.\n\nPaillote Café, just off the beach road, is the most reliable — steady power, quick service and enough outdoor seating that you''re never fighting for a table. A little further along the lakefront, several hotel terraces open their café menus to non-guests during the day, which is worth asking about if you need a quieter corner for calls.\n\nWhichever spot you pick, mornings are calmer than afternoons, and most places fill up around lunch when the cross-border trade crowd comes through for a break.',
 'Kivu Gateway Editorial', '2026-08-20', true),
('Where to Stay in Goma: Top Business Hotels', 'best-business-hotels-goma', 'Stay & Hotels',
 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=55',
 'Reliable power, meeting rooms and a short ride to the border — our picks for business travelers in Goma.',
 E'If you''re in Goma for meetings rather than a holiday, three things matter more than anything else: backup power, a workable internet connection, and how far you are from the Grande Barrière crossing if you''re going back and forth to Gisenyi.\n\nIhusi Business Hotel covers all three — it''s central, has dedicated meeting space, and most guests report the generator kicking in fast enough that you barely notice outages. For a quieter stay a short walk from the border itself, Villa Karisimbi Guesthouse is a solid, no-frills option favoured by cross-border traders.\n\nBook ahead where you can — rooms fill up fast around forums and trade events.',
 'Kivu Gateway Editorial', '2026-08-27', true),
('Crossing the Border: A First-Timer''s Guide from Gisenyi to Goma', 'crossing-border-gisenyi-goma-guide', 'Guides',
 'https://images.unsplash.com/photo-1675793049324-32d4932eafff?auto=format&fit=crop&w=1200&q=55',
 'What documents you need, how long it takes, and a few things that catch first-timers out.',
 E'Crossing from Gisenyi into Goma at the Grande Barrière is straightforward once you know what to expect, but it catches first-timers out more often than it should.\n\nBring your passport (and visa if required) — Rwandan and Congolese nationals have simplified crossing arrangements, but everyone else should confirm requirements before travelling. Day visas for Goma are available at the border for many nationalities, but the fee and rules change often enough that it''s worth checking with a local operator the same week you travel, not months in advance.\n\nExpect the crossing itself to take anywhere from 20 minutes to over an hour depending on the time of day — mornings and Friday afternoons are busiest. Money changers operate right at the border; agree on a rate before handing anything over.\n\nOur full Travel & Border page keeps this updated with current hours and requirements — treat this article as background, not the final word on the day.',
 'Kivu Gateway Editorial', '2026-09-01', true),
('Gorilla Trekking Near Virunga: What to Know Before You Go', 'gorilla-trekking-virunga-guide', 'Nature & Wildlife',
 'https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=1200&q=50',
 'Permits, fitness levels and what an encounter with a mountain gorilla family actually involves.',
 E'Virunga National Park is one of the last places on earth where you can trek to see mountain gorillas in the wild, and it''s a genuinely different experience from a wildlife documentary — the hike, the guides, and the moment you''re a few metres from a silverback all matter.\n\nPermits are limited and should be booked well ahead through a licensed operator; several businesses in our directory (tagged as Tour Operators) handle this end-to-end, including the paperwork. Treks range from a gentle hour to a demanding half-day depending on where the gorilla family has moved, so a reasonable fitness level helps.\n\nBring layers — mornings in the highlands are cold — and follow your guide''s distance instructions closely; it''s for the gorillas'' safety as much as yours.',
 'Kivu Gateway Editorial', '2026-09-05', true);
