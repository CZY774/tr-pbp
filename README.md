# Step-by-Step Setup & Struktur Proyek

## Backend Setup (Laravel):
	1. Install Laravel: composer create-project laravel/laravel hospital-backend
	2. Install API: php artisan install:api                                       
	3. Setup PostgreSQL: Update .env dengan config PostgreSQL
	4. Run migrations: php artisan migrate
	5. Run seeder: php artisan db:seed
	6. Start server: php artisan serve

## Frontend Setup (React + Vite + Tailwind CSS):
	1. Create React app: npm create vite@latest hospital-frontend -- --template react
  2. Change directory: cd hospital-frontend
	2. Install these dependencies:
         npm install
         npm install axios lucide-react
         npm install -D tailwindcss postcss autoprefixer
         npx tailwindcss init -p
	3. Replace App.js dengan kode React
	4. Install Tailwind: npm install -D tailwindcss postcss autoprefixer
  5. Start dev server: npm run dev
