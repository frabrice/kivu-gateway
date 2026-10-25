-- Points the existing businesses, events and articles at the site's own photos (public/images).
-- Run in Supabase Dashboard -> SQL Editor -> New Query -> Run, AFTER the new site version is deployed.
-- Only updates the original sample rows (matched by name / title / slug); rows you added yourself are left alone.

-- Businesses
update businesses set images = array['/images/lakeside-resort.webp','/images/lake-town-bay.webp'] where name = 'Lac Kivu Lodge';
update businesses set images = array['/images/roundabout-moto.webp','/images/lakeside-resort.webp'] where name = 'Ihusi Business Hotel';
update businesses set images = array['/images/market-vegetables.webp'] where name = 'Chez Doga Restaurant';
update businesses set images = array['/images/lake-town-bay.webp'] where name = 'Paillote Café';
update businesses set images = array['/images/intersection-traffic.webp'] where name = 'Kivu Legal & Tax Advisors';
update businesses set images = array['/images/lake-aerial-portrait.webp'] where name = 'Grands Lacs Real Estate';
update businesses set images = array['/images/cart-porter.webp'] where name = 'Kivu Cross-Border Logistics';
update businesses set images = array['/images/goma-volcano.webp'] where name = 'Great Lakes Safaris & Trekking';
update businesses set images = array['/images/fashion-storefront.webp'] where name = 'Boutique Amani';
update businesses set images = array['/images/street-moto-traffic.webp'] where name = 'Villa Karisimbi Guesthouse';

-- Events
update events set image = '/images/lakeside-resort.webp' where title = 'Goma Business & Trade Forum';
update events set image = '/images/lakeside-market.webp' where title = 'Lake Kivu Music Night';
update events set image = '/images/market-grain-sellers.webp' where title = 'Cross-Border Trade Expo';
update events set image = '/images/lake-town-bay.webp' where title = 'Gisenyi Beach Cleanup & Community Day';
update events set image = '/images/goma-volcano.webp' where title = 'Virunga Conservation Talk';

-- Articles (cover images)
update articles set cover_image = '/images/lake-town-bay.webp' where slug = 'best-cafes-gisenyi-remote-work';
update articles set cover_image = '/images/lakeside-resort.webp' where slug = 'best-business-hotels-goma';
update articles set cover_image = '/images/street-moto-traffic.webp' where slug = 'crossing-border-gisenyi-goma-guide';
update articles set cover_image = '/images/goma-volcano.webp' where slug = 'gorilla-trekking-virunga-guide';
-- "Top Supermarkets in Goma" had the article title typed into its cover image field instead of an image
update articles set cover_image = '/images/drinks-distribution.webp' where slug = 'top-supermarkets-in-goma';

-- Check: lists any row still using an image that is not one of the site's own. "No rows returned" means all done.
select 'business' as kind, name as item from businesses where exists (select 1 from unnest(images) i where i not like '/images/%')
union all
select 'event', title from events where image not like '/images/%'
union all
select 'article', title from articles where cover_image not like '/images/%';
