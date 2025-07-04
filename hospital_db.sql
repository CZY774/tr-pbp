PGDMP  2                    }            hospital_db    17.5    17.5 c    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16711    hospital_db    DATABASE     �   CREATE DATABASE hospital_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE hospital_db;
                     postgres    false            �            1259    16750    cache    TABLE     �   CREATE TABLE public.cache (
    key character varying(255) NOT NULL,
    value text NOT NULL,
    expiration integer NOT NULL
);
    DROP TABLE public.cache;
       public         heap r       postgres    false            �            1259    16757    cache_locks    TABLE     �   CREATE TABLE public.cache_locks (
    key character varying(255) NOT NULL,
    owner character varying(255) NOT NULL,
    expiration integer NOT NULL
);
    DROP TABLE public.cache_locks;
       public         heap r       postgres    false            �            1259    16782    failed_jobs    TABLE     &  CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
    DROP TABLE public.failed_jobs;
       public         heap r       postgres    false            �            1259    16781    failed_jobs_id_seq    SEQUENCE     {   CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.failed_jobs_id_seq;
       public               postgres    false    229            �           0    0    failed_jobs_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;
          public               postgres    false    228            �            1259    16774    job_batches    TABLE     d  CREATE TABLE public.job_batches (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    total_jobs integer NOT NULL,
    pending_jobs integer NOT NULL,
    failed_jobs integer NOT NULL,
    failed_job_ids text NOT NULL,
    options text,
    cancelled_at integer,
    created_at integer NOT NULL,
    finished_at integer
);
    DROP TABLE public.job_batches;
       public         heap r       postgres    false            �            1259    16765    jobs    TABLE     �   CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);
    DROP TABLE public.jobs;
       public         heap r       postgres    false            �            1259    16764    jobs_id_seq    SEQUENCE     t   CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.jobs_id_seq;
       public               postgres    false    226            �           0    0    jobs_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;
          public               postgres    false    225            �            1259    16819 
   kunjungans    TABLE     �  CREATE TABLE public.kunjungans (
    id bigint NOT NULL,
    no_antrian character varying(20) NOT NULL,
    pasien_id bigint NOT NULL,
    dokter_id bigint NOT NULL,
    tanggal_kunjungan date NOT NULL,
    jam_kunjungan time(0) without time zone,
    keluhan text,
    diagnosis text,
    tindakan text,
    status_kunjungan character varying(255) DEFAULT 'menunggu'::character varying NOT NULL,
    biaya_konsultasi numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT kunjungans_status_kunjungan_check CHECK (((status_kunjungan)::text = ANY ((ARRAY['menunggu'::character varying, 'selesai'::character varying, 'batal'::character varying])::text[])))
);
    DROP TABLE public.kunjungans;
       public         heap r       postgres    false            �            1259    16818    kunjungans_id_seq    SEQUENCE     z   CREATE SEQUENCE public.kunjungans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.kunjungans_id_seq;
       public               postgres    false    235            �           0    0    kunjungans_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.kunjungans_id_seq OWNED BY public.kunjungans.id;
          public               postgres    false    234            �            1259    16713 
   migrations    TABLE     �   CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);
    DROP TABLE public.migrations;
       public         heap r       postgres    false            �            1259    16712    migrations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.migrations_id_seq;
       public               postgres    false    218            �           0    0    migrations_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;
          public               postgres    false    217            �            1259    16808    obats    TABLE     �  CREATE TABLE public.obats (
    id bigint NOT NULL,
    kode_obat character varying(20) NOT NULL,
    nama_obat character varying(100) NOT NULL,
    jenis_obat character varying(50),
    satuan character varying(20),
    harga_satuan numeric(10,2) NOT NULL,
    stok integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
    DROP TABLE public.obats;
       public         heap r       postgres    false            �            1259    16807    obats_id_seq    SEQUENCE     u   CREATE SEQUENCE public.obats_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.obats_id_seq;
       public               postgres    false    233            �           0    0    obats_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.obats_id_seq OWNED BY public.obats.id;
          public               postgres    false    232            �            1259    16794    pasiens    TABLE     /  CREATE TABLE public.pasiens (
    id bigint NOT NULL,
    no_rm character varying(20) NOT NULL,
    nik character varying(16),
    nama_pasien character varying(100) NOT NULL,
    tanggal_lahir date NOT NULL,
    jenis_kelamin character varying(255) NOT NULL,
    alamat text,
    no_telepon character varying(15),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT pasiens_jenis_kelamin_check CHECK (((jenis_kelamin)::text = ANY ((ARRAY['L'::character varying, 'P'::character varying])::text[])))
);
    DROP TABLE public.pasiens;
       public         heap r       postgres    false            �            1259    16793    pasiens_id_seq    SEQUENCE     w   CREATE SEQUENCE public.pasiens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pasiens_id_seq;
       public               postgres    false    231            �           0    0    pasiens_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pasiens_id_seq OWNED BY public.pasiens.id;
          public               postgres    false    230            �            1259    16734    password_reset_tokens    TABLE     �   CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);
 )   DROP TABLE public.password_reset_tokens;
       public         heap r       postgres    false            �            1259    16873    personal_access_tokens    TABLE     �  CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);
 *   DROP TABLE public.personal_access_tokens;
       public         heap r       postgres    false            �            1259    16872    personal_access_tokens_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public.personal_access_tokens_id_seq;
       public               postgres    false    239            �           0    0    personal_access_tokens_id_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;
          public               postgres    false    238            �            1259    16841    reseps    TABLE       CREATE TABLE public.reseps (
    id bigint NOT NULL,
    kunjungan_id bigint NOT NULL,
    dokter_id bigint NOT NULL,
    apoteker_id bigint,
    obat_id bigint NOT NULL,
    jumlah_obat integer NOT NULL,
    dosis character varying(100),
    aturan_pakai text,
    harga_obat numeric(10,2) NOT NULL,
    total_harga numeric(10,2) NOT NULL,
    status_resep character varying(255) DEFAULT 'menunggu'::character varying NOT NULL,
    tanggal_resep timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT reseps_status_resep_check CHECK (((status_resep)::text = ANY ((ARRAY['menunggu'::character varying, 'diproses'::character varying, 'selesai'::character varying])::text[])))
);
    DROP TABLE public.reseps;
       public         heap r       postgres    false            �            1259    16840    reseps_id_seq    SEQUENCE     v   CREATE SEQUENCE public.reseps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.reseps_id_seq;
       public               postgres    false    237            �           0    0    reseps_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.reseps_id_seq OWNED BY public.reseps.id;
          public               postgres    false    236            �            1259    16741    sessions    TABLE     �   CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);
    DROP TABLE public.sessions;
       public         heap r       postgres    false            �            1259    16720    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    nama_lengkap character varying(100) NOT NULL,
    no_telepon character varying(15),
    is_active boolean DEFAULT true NOT NULL,
    email_verified_at timestamp(0) without time zone,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'dokter'::character varying, 'apoteker'::character varying])::text[])))
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16719    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public               postgres    false    220            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public               postgres    false    219            �           2604    16785    failed_jobs id    DEFAULT     p   ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);
 =   ALTER TABLE public.failed_jobs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    228    229    229            �           2604    16768    jobs id    DEFAULT     b   ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);
 6   ALTER TABLE public.jobs ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    225    226    226            �           2604    16822    kunjungans id    DEFAULT     n   ALTER TABLE ONLY public.kunjungans ALTER COLUMN id SET DEFAULT nextval('public.kunjungans_id_seq'::regclass);
 <   ALTER TABLE public.kunjungans ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    235    235            �           2604    16716    migrations id    DEFAULT     n   ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);
 <   ALTER TABLE public.migrations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    218    217    218            �           2604    16811    obats id    DEFAULT     d   ALTER TABLE ONLY public.obats ALTER COLUMN id SET DEFAULT nextval('public.obats_id_seq'::regclass);
 7   ALTER TABLE public.obats ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    233    232    233            �           2604    16797 
   pasiens id    DEFAULT     h   ALTER TABLE ONLY public.pasiens ALTER COLUMN id SET DEFAULT nextval('public.pasiens_id_seq'::regclass);
 9   ALTER TABLE public.pasiens ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    230    231    231            �           2604    16876    personal_access_tokens id    DEFAULT     �   ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);
 H   ALTER TABLE public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    239    238    239            �           2604    16844 	   reseps id    DEFAULT     f   ALTER TABLE ONLY public.reseps ALTER COLUMN id SET DEFAULT nextval('public.reseps_id_seq'::regclass);
 8   ALTER TABLE public.reseps ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    237    236    237            �           2604    16723    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            �          0    16750    cache 
   TABLE DATA           7   COPY public.cache (key, value, expiration) FROM stdin;
    public               postgres    false    223   1�       �          0    16757    cache_locks 
   TABLE DATA           =   COPY public.cache_locks (key, owner, expiration) FROM stdin;
    public               postgres    false    224   N�       �          0    16782    failed_jobs 
   TABLE DATA           a   COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
    public               postgres    false    229   k�       �          0    16774    job_batches 
   TABLE DATA           �   COPY public.job_batches (id, name, total_jobs, pending_jobs, failed_jobs, failed_job_ids, options, cancelled_at, created_at, finished_at) FROM stdin;
    public               postgres    false    227   ��       �          0    16765    jobs 
   TABLE DATA           c   COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
    public               postgres    false    226   ��       �          0    16819 
   kunjungans 
   TABLE DATA           �   COPY public.kunjungans (id, no_antrian, pasien_id, dokter_id, tanggal_kunjungan, jam_kunjungan, keluhan, diagnosis, tindakan, status_kunjungan, biaya_konsultasi, created_at, updated_at) FROM stdin;
    public               postgres    false    235          �          0    16713 
   migrations 
   TABLE DATA           :   COPY public.migrations (id, migration, batch) FROM stdin;
    public               postgres    false    218   ρ       �          0    16808    obats 
   TABLE DATA           �   COPY public.obats (id, kode_obat, nama_obat, jenis_obat, satuan, harga_satuan, stok, is_active, created_at, updated_at) FROM stdin;
    public               postgres    false    233   ��       �          0    16794    pasiens 
   TABLE DATA           �   COPY public.pasiens (id, no_rm, nik, nama_pasien, tanggal_lahir, jenis_kelamin, alamat, no_telepon, created_at, updated_at) FROM stdin;
    public               postgres    false    231   ��       �          0    16734    password_reset_tokens 
   TABLE DATA           I   COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
    public               postgres    false    221   ܄       �          0    16873    personal_access_tokens 
   TABLE DATA           �   COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
    public               postgres    false    239   ��       �          0    16841    reseps 
   TABLE DATA           �   COPY public.reseps (id, kunjungan_id, dokter_id, apoteker_id, obat_id, jumlah_obat, dosis, aturan_pakai, harga_obat, total_harga, status_resep, tanggal_resep, created_at, updated_at) FROM stdin;
    public               postgres    false    237   ��       �          0    16741    sessions 
   TABLE DATA           _   COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
    public               postgres    false    222   A�       �          0    16720    users 
   TABLE DATA           �   COPY public.users (id, username, email, password, role, nama_lengkap, no_telepon, is_active, email_verified_at, remember_token, created_at, updated_at) FROM stdin;
    public               postgres    false    220   W�       �           0    0    failed_jobs_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);
          public               postgres    false    228            �           0    0    jobs_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.jobs_id_seq', 1, false);
          public               postgres    false    225            �           0    0    kunjungans_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.kunjungans_id_seq', 6, true);
          public               postgres    false    234            �           0    0    migrations_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.migrations_id_seq', 9, true);
          public               postgres    false    217            �           0    0    obats_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.obats_id_seq', 5, true);
          public               postgres    false    232            �           0    0    pasiens_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pasiens_id_seq', 5, true);
          public               postgres    false    230            �           0    0    personal_access_tokens_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 93, true);
          public               postgres    false    238            �           0    0    reseps_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.reseps_id_seq', 6, true);
          public               postgres    false    236            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 7, true);
          public               postgres    false    219            �           2606    16763    cache_locks cache_locks_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public.cache_locks
    ADD CONSTRAINT cache_locks_pkey PRIMARY KEY (key);
 F   ALTER TABLE ONLY public.cache_locks DROP CONSTRAINT cache_locks_pkey;
       public                 postgres    false    224            �           2606    16756    cache cache_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.cache
    ADD CONSTRAINT cache_pkey PRIMARY KEY (key);
 :   ALTER TABLE ONLY public.cache DROP CONSTRAINT cache_pkey;
       public                 postgres    false    223            �           2606    16790    failed_jobs failed_jobs_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_pkey;
       public                 postgres    false    229            �           2606    16792 #   failed_jobs failed_jobs_uuid_unique 
   CONSTRAINT     ^   ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);
 M   ALTER TABLE ONLY public.failed_jobs DROP CONSTRAINT failed_jobs_uuid_unique;
       public                 postgres    false    229            �           2606    16780    job_batches job_batches_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.job_batches
    ADD CONSTRAINT job_batches_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.job_batches DROP CONSTRAINT job_batches_pkey;
       public                 postgres    false    227            �           2606    16772    jobs jobs_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.jobs DROP CONSTRAINT jobs_pkey;
       public                 postgres    false    226            �           2606    16829    kunjungans kunjungans_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.kunjungans
    ADD CONSTRAINT kunjungans_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.kunjungans DROP CONSTRAINT kunjungans_pkey;
       public                 postgres    false    235            �           2606    16718    migrations migrations_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.migrations DROP CONSTRAINT migrations_pkey;
       public                 postgres    false    218            �           2606    16817    obats obats_kode_obat_unique 
   CONSTRAINT     \   ALTER TABLE ONLY public.obats
    ADD CONSTRAINT obats_kode_obat_unique UNIQUE (kode_obat);
 F   ALTER TABLE ONLY public.obats DROP CONSTRAINT obats_kode_obat_unique;
       public                 postgres    false    233            �           2606    16815    obats obats_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.obats
    ADD CONSTRAINT obats_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.obats DROP CONSTRAINT obats_pkey;
       public                 postgres    false    233            �           2606    16806    pasiens pasiens_nik_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.pasiens
    ADD CONSTRAINT pasiens_nik_unique UNIQUE (nik);
 D   ALTER TABLE ONLY public.pasiens DROP CONSTRAINT pasiens_nik_unique;
       public                 postgres    false    231            �           2606    16804    pasiens pasiens_no_rm_unique 
   CONSTRAINT     X   ALTER TABLE ONLY public.pasiens
    ADD CONSTRAINT pasiens_no_rm_unique UNIQUE (no_rm);
 F   ALTER TABLE ONLY public.pasiens DROP CONSTRAINT pasiens_no_rm_unique;
       public                 postgres    false    231            �           2606    16802    pasiens pasiens_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.pasiens
    ADD CONSTRAINT pasiens_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.pasiens DROP CONSTRAINT pasiens_pkey;
       public                 postgres    false    231            �           2606    16740 0   password_reset_tokens password_reset_tokens_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);
 Z   ALTER TABLE ONLY public.password_reset_tokens DROP CONSTRAINT password_reset_tokens_pkey;
       public                 postgres    false    221                       2606    16880 2   personal_access_tokens personal_access_tokens_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);
 \   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_pkey;
       public                 postgres    false    239                       2606    16883 :   personal_access_tokens personal_access_tokens_token_unique 
   CONSTRAINT     v   ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);
 d   ALTER TABLE ONLY public.personal_access_tokens DROP CONSTRAINT personal_access_tokens_token_unique;
       public                 postgres    false    239            �           2606    16851    reseps reseps_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.reseps
    ADD CONSTRAINT reseps_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.reseps DROP CONSTRAINT reseps_pkey;
       public                 postgres    false    237            �           2606    16747    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public                 postgres    false    222            �           2606    16733    users users_email_unique 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);
 B   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_unique;
       public                 postgres    false    220            �           2606    16729    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    220            �           2606    16731    users users_username_unique 
   CONSTRAINT     Z   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);
 E   ALTER TABLE ONLY public.users DROP CONSTRAINT users_username_unique;
       public                 postgres    false    220            �           1259    16773    jobs_queue_index    INDEX     B   CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);
 $   DROP INDEX public.jobs_queue_index;
       public                 postgres    false    226                       1259    16881 8   personal_access_tokens_tokenable_type_tokenable_id_index    INDEX     �   CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);
 L   DROP INDEX public.personal_access_tokens_tokenable_type_tokenable_id_index;
       public                 postgres    false    239    239            �           1259    16749    sessions_last_activity_index    INDEX     Z   CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);
 0   DROP INDEX public.sessions_last_activity_index;
       public                 postgres    false    222            �           1259    16748    sessions_user_id_index    INDEX     N   CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);
 *   DROP INDEX public.sessions_user_id_index;
       public                 postgres    false    222                       2606    16835 '   kunjungans kunjungans_dokter_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.kunjungans
    ADD CONSTRAINT kunjungans_dokter_id_foreign FOREIGN KEY (dokter_id) REFERENCES public.users(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.kunjungans DROP CONSTRAINT kunjungans_dokter_id_foreign;
       public               postgres    false    220    235    4828                       2606    16830 '   kunjungans kunjungans_pasien_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.kunjungans
    ADD CONSTRAINT kunjungans_pasien_id_foreign FOREIGN KEY (pasien_id) REFERENCES public.pasiens(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.kunjungans DROP CONSTRAINT kunjungans_pasien_id_foreign;
       public               postgres    false    235    4855    231                       2606    16862 !   reseps reseps_apoteker_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.reseps
    ADD CONSTRAINT reseps_apoteker_id_foreign FOREIGN KEY (apoteker_id) REFERENCES public.users(id) ON DELETE SET NULL;
 K   ALTER TABLE ONLY public.reseps DROP CONSTRAINT reseps_apoteker_id_foreign;
       public               postgres    false    237    4828    220                       2606    16857    reseps reseps_dokter_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.reseps
    ADD CONSTRAINT reseps_dokter_id_foreign FOREIGN KEY (dokter_id) REFERENCES public.users(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.reseps DROP CONSTRAINT reseps_dokter_id_foreign;
       public               postgres    false    220    237    4828            	           2606    16852 "   reseps reseps_kunjungan_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.reseps
    ADD CONSTRAINT reseps_kunjungan_id_foreign FOREIGN KEY (kunjungan_id) REFERENCES public.kunjungans(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.reseps DROP CONSTRAINT reseps_kunjungan_id_foreign;
       public               postgres    false    4861    235    237            
           2606    16867    reseps reseps_obat_id_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.reseps
    ADD CONSTRAINT reseps_obat_id_foreign FOREIGN KEY (obat_id) REFERENCES public.obats(id) ON DELETE CASCADE;
 G   ALTER TABLE ONLY public.reseps DROP CONSTRAINT reseps_obat_id_foreign;
       public               postgres    false    4859    237    233            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�u�=��0�Y��nK�d;q=�A��n���������i�&Mr�ů�%F6�+D$���w�y��:�T�������X]�C�K���Rs�X8���:c%TJ���(�QFz��k.�����D�C��Y�g�1�?���x>7mS�(;_�=��|�|�����eJÅ��V&�].��=�C.�����]֡�/�t;�Z���D�x�T��9mD�G��4sRM�G��m���m�sO�}&�L�d��N1��NqN|$      �   �   x�m��
�0�k}��V[�]!���t���sc�RB�����B!��������!`�R!Ku�2B�v�V7�"�]�օJ�0�B����~"NT�Tw��C�&�M�#\v�w�r�ɵ�����+�6��nάǓ�
h-�c�-��]�4 ��H4"� 9l2��Ca�1���,�!i��      �   �   x����j� ����@�q�d��5�B-l��� E�MH�}��M���'�>���G$�O�GB��1����ޗ�<�	L��������¦�;M$���Lի^C?����{�>o��њ����V�(��Wv=ʮ�u<�S��	ֻ��v���Z��bAVfE<��>�4ƭ�+�x���J���g��0��Ϻt�e.e�b6��]�S�ؽ�c�V���z9(�>zXj7      �   F  x����j�0���S��bKNb�6�Ö����v$4Y[������5t�f�`�X��%i�V��!C����(���)Tbb�9ī(�K��˦=��oa)5�Bt��LBY��$�P��*��J�!�Y-��&~e�Q(�Wr{j�5SXN�)>j:��/[�A�!p��{���ձ�;�{��g\�u�6$_|I���* �&s6s��椲y���i���}+�x�e[]䦥�:�"u���6��
w���V ��I�0G5�E�䞈)�]bM��I>���{e�a��m�T%]��r՗}��L�ioeB�ǜ}.�(�LːE      �      x������ � �      �   �	  x��Y͎��<�����=�<@r�)
��E��;��]Eޙig$a��(,�d�Z�o��/_������˗?�<���o�?���o������7�Z,M>x���S�Vװ=q飌���Q:��\h���l�������_߄����wD7֛�ۗ?}���c��ݤ�R/�C�����X�0ǚ���kʐ6Xd���!ix��z4[PWn�˚���|/��f~y�s�N�����uj��iLu5����s�y�֨����,�k.�%�uD�5�2�C�Rv��nz��oaN�����ܹ�+E��U�kU��ygI%d.�e�6i�� [g�����L��OM7��~*�*�ԋ_�)�{idt�dN^��E���}`��]�{^:����c�a�O��DnZv�>��#�7�S�%t�S>�YxM�hs�ūzʓ�,������Т�{�X�U�p�^��N�����TnD��+�B�:P�#e�ls��h�B��"���F`�CjH�4�<|�e-Y���D1�7.ۉ0盥S�x����O,��H�G1�������LM��E]K�5S��Z��빝L7��c;w/on��K�U?'��;/-�*��6}�kt����ډZ�i��$���F����z~�}�����)��,��S� ��͔�J6T��hf��Wo�Խ%�VI�{��+�`�td%{b��z�+Qe#�&u�m���6�Mk���Z=M�$ģ�2,D[U�#���<�����O�׉��9b-��0��0��y�0�Q4Z���kR ��2m9-y�W��M�c���JO����0��0טּߜ��Wc�&a�5��.�q_yj�h�P�Z�X��I���@J馏���z���l��7��^���7���L�Y)������B}�$ވ 
ѾW.�v�Yi�$X�N���WuV��Ko���O����P�#��K��߹�5R��t�����|c0%�R���P�)��蜣������۔5 ��C5�NU|'#�>�����<J��Ut?�^/9^iT�>8�J��[Z�Qu�R0�$��J/9A� �Vr�����o�]�h� v-׉���$���2$�mi�Q� A�LPt�Z%i���Ս͗P�"��Qx�XăP��>�^�R�d�\KS��z�
ps(��#Ae�DsCw�N�(Z� WM���vnŞ�۹ÏSO��������0U��{1�_:��6xnX5hR|ah��^Ϋ��n[k�<��#L���>^R[�5o��g�Ȇ�/N I=7�фS?S!��t@�T=m'f����[��@>�^|��~�q�}[��82����9Ko*�k�ߵ>���@�V�N�i�������tJ�N�yo�"ć�f)�l����Q�Ԅe�:�A�f*�G)L	��u�P��9���I|39�^r�λ:�� ����*�&�*�&X'����,e�=J7��(*�h>O�h��-��>ς�n�ԋO��;Ĺ�f�Ć[����A�^"2|�ĪN#��[N����U�?��GX��z�=��0Tz�S��:�&�Ԛ<[�T�a�tE�Vn�����ო�s?��oѮO�s�^zb�{�)m�Q��.p�6�!�B�2��r���uT��,�\
S�k��k�������K0�b����̓�:k��I�$=�0���s-�@s"�<3�r��:�2ǯ����*��%'�q7���1PBՀ����K=���+�!!�1OO[���	ʸ2Nf͸CT϶'m�>?����ԋO�������v�B��s�@��AF��\��*�_j(x=��s>��={O���i��̐�}��1`�0`<R���h�}���h��n�P��0��s����x�����=\�����0�@,�o�[��O�M�Ƣ�ZropMG���O�F=w�z�u�}�=��y�9�BKi�N��C�XG
�rx�b�89,*.h-��l� ���%iKD�6�;A璢� �0�2z.�0�8|N�����
4��{������Z��0�R/9��;ؠ1�D�E:g�+��Y`�6WW�X��X��3�z�a,9�N���c�P�A|���;�^z���c$ ��8�c��N����@�JTi�y���M�৮��`��J���m�ض�<�^z��}���m���Q o��V����Y��}QGr$��#����s�����ܡ��O���td�bduNC���e@D��gA�f�s?lQHKk�%^#�C������_�(�z��Ǻt��
�-�h3�0��>֕+\@����9>��!lX�D�u��# m��\緰�R�xI�X��p��3��w��Q�6xd�}8�9�(���:u��b��Ώp��G��+^�g5xJ}(Ə��]J��
=N^��Y&(������A���<�np�ݽk|˯�/w�ח�_��_fɺa      �   �   x�u��
�0���S�J�4��!v��KEeZa*��׉�)�Z�C��1@�0h���6��@�c���[ $��挙�ّ�gX^1f%`�N7��14���#L��M�i�@V��}�s��y�#��wӠ3�	�1e��	������[��B}ˑ��ir$N��8-�UU(�>ӬKR      �     x�͖Ɏ�0E��W��ZU6�	j����t���Sʀ	H%��M�P�Ȼ�tm_=��%�q��8�N&�U��8sG��og��CE�N�_dE�L�p7V������ձ��W�PN���$ ���@�WA?�x��[տ*��"!��ۖ��7�WM)�e�t_��tm�
�+ �K��o�Ŵ�c?:u�,��L�yVYj>v ��*5�[�{|L�9UY���B�>OqR��Sl72�$��;���W��>�[�-�("\9�az�S���{�H�z����b��ݠ]3���d��G�Z�㕥"�H�U��\�tV�3��P��?vU&>��>ipʃ�9^L{�2ާ��!?fPU�T	�y��G�B��ӨqKv#4�f��^+�[��3�t���܄�iC1�K�1p}��~c)�#��|��$ +�2�e_=;!e�|=l�ɕ)˪:=$��_��q(�XQ����»=��PZ�����m�8!�~@���ކ���F�dr�.�$�M��dB��&ϭr��X�"��/?��]j1��l�J���1(��P��߰Kڒ���߇{��c\3\�6�C��GW�n�O�D�>(���d�4ow�#ڍo�EE:Q��~X�f����#W��-znB��YhG�Y1��r�Tb�-�n��U!7�/�ċ�݉����w��{H���ٝ]��oY~.ޣx�M��݌�.t�F��|\=7!�� 3����v4��Br!n���F}{�B-ƾ1@���ᯞ�R�b��e>����X      �   �  x����n�@E��W��֤�x�*d�CdE�����8�bXD*ݒjq�� ��mg��i�Tg��+�h���M������w/<M�~���̗�W��	�4�;(��h3۴>��,V���Oj4�%�o���M��A@VTM71��ٻ`P�X�!P(��M���Y�5H�~�9O�l��ΝO�k�N��Y���˔Ǐw��Q������+D�%��׌�5|���)c���jכ>�D�:%
Y���K��]b3p懨3����I��t->���^G�;M�_%������->��m�[���jU\�֙�isVė_�f���Ȳ�U����������־R&+/Rڽq\��`%�m�w��Y&��G������d�*��X���0�K���*<K� ��{ı     