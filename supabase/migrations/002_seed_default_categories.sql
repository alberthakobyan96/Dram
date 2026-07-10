insert into public.categories (name, type, icon, color, is_default)
values
  ('Salary', 'income', 'briefcase', '#16A34A', true),
  ('Bonus', 'income', 'sparkles', '#22C55E', true),
  ('Interest', 'income', 'landmark', '#0EA5E9', true),
  ('Gift', 'income', 'gift', '#A855F7', true),
  ('Food', 'expense', 'utensils', '#F97316', true),
  ('Transport', 'expense', 'car', '#3B82F6', true),
  ('Shopping', 'expense', 'shopping-bag', '#EC4899', true),
  ('Bills', 'expense', 'receipt', '#64748B', true),
  ('Health', 'expense', 'heart-pulse', '#EF4444', true),
  ('Entertainment', 'expense', 'ticket', '#8B5CF6', true)
on conflict do nothing;
