--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.0

-- Started on 2019-04-29 11:09:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 57677)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 219 (class 1259 OID 59423)
-- Name: banque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banque (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    date_operation date NOT NULL,
    agence character varying(500),
    numero_ticket character varying(1000) NOT NULL,
    somme double precision NOT NULL,
    solde_anterieur double precision NOT NULL,
    total double precision,
    is_depot boolean,
    is_retrait boolean,
    vendu_in_banque_id bigint,
    is_virement boolean DEFAULT false,
    motif character varying(100),
    commande_id bigint
);


ALTER TABLE public.banque OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 59487)
-- Name: banque_commande_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banque_commande_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banque_commande_id_seq OWNER TO postgres;

--
-- TOC entry 2970 (class 0 OID 0)
-- Dependencies: 223
-- Name: banque_commande_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banque_commande_id_seq OWNED BY public.banque.commande_id;


--
-- TOC entry 217 (class 1259 OID 59419)
-- Name: banque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banque_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banque_id_seq OWNER TO postgres;

--
-- TOC entry 2971 (class 0 OID 0)
-- Dependencies: 217
-- Name: banque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banque_id_seq OWNED BY public.banque.id;


--
-- TOC entry 218 (class 1259 OID 59421)
-- Name: banque_vendu_in_banque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banque_vendu_in_banque_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banque_vendu_in_banque_id_seq OWNER TO postgres;

--
-- TOC entry 2972 (class 0 OID 0)
-- Dependencies: 218
-- Name: banque_vendu_in_banque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banque_vendu_in_banque_id_seq OWNED BY public.banque.vendu_in_banque_id;


--
-- TOC entry 222 (class 1259 OID 59475)
-- Name: commande; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.commande (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    quantite integer NOT NULL,
    montant double precision NOT NULL,
    date_achat date NOT NULL,
    produit_id bigint NOT NULL
);


ALTER TABLE public.commande OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 59471)
-- Name: commande_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commande_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commande_id_seq OWNER TO postgres;

--
-- TOC entry 2973 (class 0 OID 0)
-- Dependencies: 220
-- Name: commande_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commande_id_seq OWNED BY public.commande.id;


--
-- TOC entry 221 (class 1259 OID 59473)
-- Name: commande_produit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.commande_produit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commande_produit_id_seq OWNER TO postgres;

--
-- TOC entry 2974 (class 0 OID 0)
-- Dependencies: 221
-- Name: commande_produit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.commande_produit_id_seq OWNED BY public.commande.produit_id;


--
-- TOC entry 196 (class 1259 OID 57678)
-- Name: flyway_schema_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flyway_schema_history (
    installed_rank integer NOT NULL,
    version character varying(50),
    description character varying(200) NOT NULL,
    type character varying(20) NOT NULL,
    script character varying(1000) NOT NULL,
    checksum integer,
    installed_by character varying(100) NOT NULL,
    installed_on timestamp without time zone DEFAULT now() NOT NULL,
    execution_time integer NOT NULL,
    success boolean NOT NULL
);


ALTER TABLE public.flyway_schema_history OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 57812)
-- Name: historique_produit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.historique_produit (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    libelle character varying(500) NOT NULL,
    quantite integer NOT NULL,
    marque character varying(50)
);


ALTER TABLE public.historique_produit OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 57810)
-- Name: historique_produit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.historique_produit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.historique_produit_id_seq OWNER TO postgres;

--
-- TOC entry 2975 (class 0 OID 0)
-- Dependencies: 215
-- Name: historique_produit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.historique_produit_id_seq OWNED BY public.historique_produit.id;


--
-- TOC entry 214 (class 1259 OID 57797)
-- Name: marchandise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.marchandise (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    nb_sac_vendu integer NOT NULL,
    total_sac_vendu integer NOT NULL,
    total_sac_marchandise integer NOT NULL,
    total_marchandise_restant integer NOT NULL,
    produit_id bigint NOT NULL
);


ALTER TABLE public.marchandise OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 57793)
-- Name: marchandise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marchandise_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.marchandise_id_seq OWNER TO postgres;

--
-- TOC entry 2976 (class 0 OID 0)
-- Dependencies: 212
-- Name: marchandise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marchandise_id_seq OWNED BY public.marchandise.id;


--
-- TOC entry 213 (class 1259 OID 57795)
-- Name: marchandise_produit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.marchandise_produit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.marchandise_produit_id_seq OWNER TO postgres;

--
-- TOC entry 2977 (class 0 OID 0)
-- Dependencies: 213
-- Name: marchandise_produit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.marchandise_produit_id_seq OWNED BY public.marchandise.produit_id;


--
-- TOC entry 205 (class 1259 OID 57732)
-- Name: produit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produit (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    libelle character varying(500) NOT NULL,
    quantite_commande integer NOT NULL,
    marque character varying(50),
    libelle_enum character varying(50)
);


ALTER TABLE public.produit OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 57730)
-- Name: produit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.produit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.produit_id_seq OWNER TO postgres;

--
-- TOC entry 2978 (class 0 OID 0)
-- Dependencies: 204
-- Name: produit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.produit_id_seq OWNED BY public.produit.id;


--
-- TOC entry 200 (class 1259 OID 57703)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    role character varying(30)
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 57701)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- TOC entry 2979 (class 0 OID 0)
-- Dependencies: 199
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 203 (class 1259 OID 57713)
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 57711)
-- Name: user_roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_role_id_seq OWNER TO postgres;

--
-- TOC entry 2980 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_role_id_seq OWNED BY public.user_roles.role_id;


--
-- TOC entry 201 (class 1259 OID 57709)
-- Name: user_roles_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_roles_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_roles_user_id_seq OWNER TO postgres;

--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 201
-- Name: user_roles_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_roles_user_id_seq OWNED BY public.user_roles.user_id;


--
-- TOC entry 198 (class 1259 OID 57690)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    nom character varying(500) NOT NULL,
    prenom character varying(500) NOT NULL,
    email character varying(500) NOT NULL,
    password character varying(500) NOT NULL,
    enabled boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 57688)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 211 (class 1259 OID 57756)
-- Name: vendu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendu (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    date_vente date NOT NULL,
    quantite integer NOT NULL,
    prix_unitaire double precision,
    total double precision,
    produit_id bigint NOT NULL,
    vendu_in_banque_id bigint NOT NULL,
    is_comptabiliser boolean DEFAULT false
);


ALTER TABLE public.vendu OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 57750)
-- Name: vendu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendu_id_seq OWNER TO postgres;

--
-- TOC entry 2983 (class 0 OID 0)
-- Dependencies: 208
-- Name: vendu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendu_id_seq OWNED BY public.vendu.id;


--
-- TOC entry 207 (class 1259 OID 57743)
-- Name: vendu_in_banque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vendu_in_banque (
    id bigint NOT NULL,
    create_at timestamp without time zone,
    update_at timestamp without time zone,
    modificationcounter integer NOT NULL,
    is_depot_banque boolean DEFAULT false,
    debut_semaine date NOT NULL,
    fin_semaine date NOT NULL
);


ALTER TABLE public.vendu_in_banque OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 57741)
-- Name: vendu_in_banque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendu_in_banque_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendu_in_banque_id_seq OWNER TO postgres;

--
-- TOC entry 2984 (class 0 OID 0)
-- Dependencies: 206
-- Name: vendu_in_banque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendu_in_banque_id_seq OWNED BY public.vendu_in_banque.id;


--
-- TOC entry 209 (class 1259 OID 57752)
-- Name: vendu_produit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendu_produit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendu_produit_id_seq OWNER TO postgres;

--
-- TOC entry 2985 (class 0 OID 0)
-- Dependencies: 209
-- Name: vendu_produit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendu_produit_id_seq OWNED BY public.vendu.produit_id;


--
-- TOC entry 210 (class 1259 OID 57754)
-- Name: vendu_vendu_in_banque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendu_vendu_in_banque_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vendu_vendu_in_banque_id_seq OWNER TO postgres;

--
-- TOC entry 2986 (class 0 OID 0)
-- Dependencies: 210
-- Name: vendu_vendu_in_banque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendu_vendu_in_banque_id_seq OWNED BY public.vendu.vendu_in_banque_id;


--
-- TOC entry 2777 (class 2604 OID 59426)
-- Name: banque id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banque ALTER COLUMN id SET DEFAULT nextval('public.banque_id_seq'::regclass);


--
-- TOC entry 2778 (class 2604 OID 59427)
-- Name: banque vendu_in_banque_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banque ALTER COLUMN vendu_in_banque_id SET DEFAULT nextval('public.banque_vendu_in_banque_id_seq'::regclass);


--
-- TOC entry 2780 (class 2604 OID 59489)
-- Name: banque commande_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banque ALTER COLUMN commande_id SET DEFAULT nextval('public.banque_commande_id_seq'::regclass);


--
-- TOC entry 2781 (class 2604 OID 59478)
-- Name: commande id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande ALTER COLUMN id SET DEFAULT nextval('public.commande_id_seq'::regclass);


--
-- TOC entry 2782 (class 2604 OID 59479)
-- Name: commande produit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande ALTER COLUMN produit_id SET DEFAULT nextval('public.commande_produit_id_seq'::regclass);


--
-- TOC entry 2776 (class 2604 OID 57815)
-- Name: historique_produit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_produit ALTER COLUMN id SET DEFAULT nextval('public.historique_produit_id_seq'::regclass);


--
-- TOC entry 2774 (class 2604 OID 57800)
-- Name: marchandise id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marchandise ALTER COLUMN id SET DEFAULT nextval('public.marchandise_id_seq'::regclass);


--
-- TOC entry 2775 (class 2604 OID 57802)
-- Name: marchandise produit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marchandise ALTER COLUMN produit_id SET DEFAULT nextval('public.marchandise_produit_id_seq'::regclass);


--
-- TOC entry 2767 (class 2604 OID 57735)
-- Name: produit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produit ALTER COLUMN id SET DEFAULT nextval('public.produit_id_seq'::regclass);


--
-- TOC entry 2764 (class 2604 OID 57706)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 2765 (class 2604 OID 57716)
-- Name: user_roles user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN user_id SET DEFAULT nextval('public.user_roles_user_id_seq'::regclass);


--
-- TOC entry 2766 (class 2604 OID 57717)
-- Name: user_roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles ALTER COLUMN role_id SET DEFAULT nextval('public.user_roles_role_id_seq'::regclass);


--
-- TOC entry 2763 (class 2604 OID 57693)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2770 (class 2604 OID 57759)
-- Name: vendu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu ALTER COLUMN id SET DEFAULT nextval('public.vendu_id_seq'::regclass);


--
-- TOC entry 2771 (class 2604 OID 57760)
-- Name: vendu produit_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu ALTER COLUMN produit_id SET DEFAULT nextval('public.vendu_produit_id_seq'::regclass);


--
-- TOC entry 2772 (class 2604 OID 57761)
-- Name: vendu vendu_in_banque_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu ALTER COLUMN vendu_in_banque_id SET DEFAULT nextval('public.vendu_vendu_in_banque_id_seq'::regclass);


--
-- TOC entry 2768 (class 2604 OID 57746)
-- Name: vendu_in_banque id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu_in_banque ALTER COLUMN id SET DEFAULT nextval('public.vendu_in_banque_id_seq'::regclass);


--
-- TOC entry 2960 (class 0 OID 59423)
-- Dependencies: 219
-- Data for Name: banque; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.banque VALUES (1, '2019-03-27 21:58:52.736', '2019-03-27 21:58:52.736', 0, '2019-01-28', NULL, 'N/A', 1496000, 0, NULL, true, false, 1, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (2, '2019-03-27 22:10:31.104', '2019-03-27 22:10:31.104', 0, '2019-02-05', NULL, 'N/A', 680000, 0, NULL, true, false, 2, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (3, '2019-03-27 22:16:57.52', '2019-03-27 22:16:57.52', 0, '2019-02-25', NULL, 'N/A', 1564000, 0, NULL, true, false, 3, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (4, '2019-03-27 22:21:04.978', '2019-03-27 22:21:04.978', 0, '2019-03-04', NULL, 'N/A', 5390000, 0, NULL, true, false, 4, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (5, '2019-04-14 13:09:50.361', '2019-04-14 13:09:50.361', 0, '2019-04-07', NULL, 'N/A', 2520000, 0, NULL, true, false, 5, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (6, '2019-04-14 13:10:54.251', '2019-04-14 13:10:54.251', 0, '2019-03-24', NULL, 'N/A', 1960000, 0, NULL, true, false, 6, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (7, '2019-04-14 13:11:30.807', '2019-04-14 13:11:30.807', 0, '2019-02-10', NULL, 'N/A', 204000, 0, NULL, true, false, 7, false, 'vente marchandise', NULL);
INSERT INTO public.banque VALUES (8, '2019-04-22 15:55:27.786', '2019-04-22 15:55:27.786', 0, '2019-04-18', 'Kipé', 'N/A', 0, 0, 13300000, false, false, NULL, true, 'ACHAT_MARCHANDISE', 3);
INSERT INTO public.banque VALUES (10, '2019-04-22 15:55:27.786', '2019-04-22 15:55:27.786', 0, '2019-04-14', 'Kipé', 'N/A', 0, 0, 49700000, false, false, NULL, true, 'ACHAT_MARCHANDISE', 4);


--
-- TOC entry 2963 (class 0 OID 59475)
-- Dependencies: 222
-- Data for Name: commande; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.commande VALUES (3, '2019-04-22 15:55:27.786', '2019-04-22 15:55:27.786', 0, 200, 13300000, '2019-04-18', 1);
INSERT INTO public.commande VALUES (4, '2019-04-22 15:55:27.786', '2019-04-22 15:55:27.786', 0, 700, 49700000, '2019-04-14', 2);


--
-- TOC entry 2937 (class 0 OID 57678)
-- Dependencies: 196
-- Data for Name: flyway_schema_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.flyway_schema_history VALUES (0, NULL, '<< Flyway Schema Creation >>', 'SCHEMA', '"public"', NULL, 'postgres', '2019-03-25 15:39:11.303084', 0, true);
INSERT INTO public.flyway_schema_history VALUES (1, '001', 'create table authentification', 'SQL', 'script/S1/V001__create_table_authentification.sql', -1120075565, 'postgres', '2019-03-25 15:39:11.46415', 71, true);
INSERT INTO public.flyway_schema_history VALUES (2, '002', 'create table db', 'SQL', 'script/S2/V002__create_table_db.sql', -601498092, 'postgres', '2019-03-25 15:39:11.566155', 110, true);
INSERT INTO public.flyway_schema_history VALUES (3, '003', 'create table historique produit', 'SQL', 'script/S2/V003__create_table_historique_produit.sql', -959104576, 'postgres', '2019-03-25 15:39:11.693496', 22, true);
INSERT INTO public.flyway_schema_history VALUES (4, '004', 'alter table produit add column type', 'SQL', 'script/S2/V004__alter_table_produit_add_column_type.sql', 1527541416, 'postgres', '2019-03-25 15:39:11.724761', 3, true);
INSERT INTO public.flyway_schema_history VALUES (5, '005', 'alter table vendu add column', 'SQL', 'script/S2/V005__alter_table_vendu_add_column.sql', 1457353073, 'postgres', '2019-03-25 15:39:11.735533', 2, true);
INSERT INTO public.flyway_schema_history VALUES (6, '006', 'alter table banque rename columns', 'SQL', 'script/S2/V006__alter_table_banque_rename_columns.sql', -701309789, 'postgres', '2019-03-25 15:39:11.746852', 5, true);
INSERT INTO public.flyway_schema_history VALUES (7, '007', 'alter table marchandise drop column nb sac anterieur', 'SQL', 'script/S2/V007__alter_table_marchandise_drop_column_nb_sac_anterieur.sql', -64366069, 'postgres', '2019-03-25 23:36:29.667271', 18, true);
INSERT INTO public.flyway_schema_history VALUES (8, '008', 'create table commande', 'SQL', 'script/S2/V008__create_table_commande.sql', 625294480, 'postgres', '2019-04-22 14:45:58.285503', 67, true);
INSERT INTO public.flyway_schema_history VALUES (9, '009', 'alter table banque', 'SQL', 'script/S2/V009__alter_table_banque.sql', -1293029445, 'postgres', '2019-04-22 15:06:21.223057', 1, true);


--
-- TOC entry 2957 (class 0 OID 57812)
-- Dependencies: 216
-- Data for Name: historique_produit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.historique_produit VALUES (1, '2019-03-25 15:47:58.022', '2019-03-25 15:47:58.022', 0, 'ciment', 200, 'GI_32_5');
INSERT INTO public.historique_produit VALUES (2, '2019-04-14 13:24:48.294', '2019-04-14 13:24:48.294', 0, 'ciment', 710, 'GI_42_5');
INSERT INTO public.historique_produit VALUES (3, '2019-04-22 15:55:27.801', '2019-04-22 15:55:27.801', 0, 'ciment', 200, 'GI_32_5');


--
-- TOC entry 2955 (class 0 OID 57797)
-- Dependencies: 214
-- Data for Name: marchandise; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.marchandise VALUES (2, '2019-03-25 16:15:57.206', '2019-03-25 16:15:57.206', 0, '2019-01-29', '2019-01-29', 10, 10, 178, 168, 1);
INSERT INTO public.marchandise VALUES (1, '2019-03-25 16:03:48.652', '2019-03-25 16:03:48.652', 0, '2019-01-07', '2019-01-13', 22, 22, 200, 178, 1);
INSERT INTO public.marchandise VALUES (3, '2019-03-25 16:22:25.359', '2019-03-25 16:22:25.359', 0, '2019-02-25', '2019-03-03', 23, 23, 168, 145, 1);
INSERT INTO public.marchandise VALUES (4, '2019-03-25 16:53:09.675', '2019-03-25 16:53:09.675', 0, '2019-03-11', '2019-03-17', 77, 77, 145, 68, 1);
INSERT INTO public.marchandise VALUES (5, '2019-04-14 12:33:44.982', '2019-04-14 12:33:44.983', 0, '2019-04-14', '2019-04-21', 36, 36, 68, 32, 1);
INSERT INTO public.marchandise VALUES (6, '2019-04-14 13:02:39.954', '2019-04-14 13:02:39.954', 0, '2019-04-14', '2019-04-21', 28, 28, 32, 4, 1);
INSERT INTO public.marchandise VALUES (7, '2019-04-14 13:04:36.352', '2019-04-14 13:04:36.352', 0, '2019-04-14', '2019-04-21', 3, 3, 4, 1, 1);


--
-- TOC entry 2946 (class 0 OID 57732)
-- Dependencies: 205
-- Data for Name: produit; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.produit VALUES (2, '2019-04-14 13:24:48.284', '2019-04-14 13:24:48.284', 0, 'ciment', 710, 'GI_42_5', 'CIMENT');
INSERT INTO public.produit VALUES (1, '2019-03-25 15:47:57.999', '2019-03-25 15:47:57.999', 0, 'ciment', 201, 'GI_32_5', 'CIMENT');


--
-- TOC entry 2941 (class 0 OID 57703)
-- Dependencies: 200
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.role VALUES (1, NULL, NULL, 0, 'ROLE_ADMIN');
INSERT INTO public.role VALUES (2, NULL, NULL, 0, 'ROLE_DG');
INSERT INTO public.role VALUES (3, NULL, NULL, 0, 'ROLE_COMMERCANT');


--
-- TOC entry 2944 (class 0 OID 57713)
-- Dependencies: 203
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_roles VALUES (1, 2);


--
-- TOC entry 2939 (class 0 OID 57690)
-- Dependencies: 198
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, '2019-03-25 15:47:14.09', '2019-03-25 15:47:14.09', 0, 'BALDE', 'Mamadou Oury', 'mamoudous2005@yahoo.fr', '$2a$10$y9JkAS60fal.BnJT7yC5nuu/3b/Y5tOPUz9CaIUelNHeEKeu2IB/C', true);


--
-- TOC entry 2952 (class 0 OID 57756)
-- Dependencies: 211
-- Data for Name: vendu; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vendu VALUES (1, '2019-03-25 15:59:09.516', '2019-03-25 15:59:09.516', 0, '2019-01-07', 22, 68000, 1496000, 1, 1, true);
INSERT INTO public.vendu VALUES (2, '2019-03-25 16:05:30.367', '2019-03-25 16:05:30.367', 0, '2019-01-29', 10, 68000, 680000, 1, 2, true);
INSERT INTO public.vendu VALUES (3, '2019-03-25 16:21:53.455', '2019-03-25 16:21:53.455', 0, '2019-02-25', 20, 68000, 1360000, 1, 3, true);
INSERT INTO public.vendu VALUES (4, '2019-03-25 16:21:53.459', '2019-03-25 16:21:53.459', 0, '2019-02-26', 3, 68000, 204000, 1, 3, true);
INSERT INTO public.vendu VALUES (5, '2019-03-25 16:51:27.059', '2019-03-25 16:51:27.059', 0, '2019-03-12', 52, 70000, 3640000, 1, 4, true);
INSERT INTO public.vendu VALUES (6, '2019-03-25 16:51:27.077', '2019-03-25 16:51:27.077', 0, '2019-03-14', 25, 70000, 1750000, 1, 4, true);
INSERT INTO public.vendu VALUES (7, '2019-04-14 12:30:54.009', '2019-04-14 12:30:54.009', 0, '2019-04-02', 36, 70000, 2520000, 1, 5, true);
INSERT INTO public.vendu VALUES (8, '2019-04-14 12:36:06.864', '2019-04-14 12:36:06.864', 0, '2019-03-18', 28, 70000, 1960000, 1, 6, true);
INSERT INTO public.vendu VALUES (9, '2019-04-14 13:03:41.632', '2019-04-14 13:03:41.632', 0, '2019-02-06', 3, 68000, 204000, 1, 7, true);


--
-- TOC entry 2948 (class 0 OID 57743)
-- Dependencies: 207
-- Data for Name: vendu_in_banque; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.vendu_in_banque VALUES (1, '2019-03-25 15:59:09.509', '2019-03-25 15:59:09.509', 0, true, '2019-01-07', '2019-01-07');
INSERT INTO public.vendu_in_banque VALUES (2, '2019-03-25 16:05:30.363', '2019-03-25 16:05:30.363', 0, true, '2019-01-29', '2019-01-29');
INSERT INTO public.vendu_in_banque VALUES (3, '2019-03-25 16:21:53.445', '2019-03-25 16:21:53.445', 0, true, '2019-02-25', '2019-02-26');
INSERT INTO public.vendu_in_banque VALUES (4, '2019-03-25 16:51:27.03', '2019-03-25 16:51:27.03', 0, true, '2019-03-12', '2019-03-14');
INSERT INTO public.vendu_in_banque VALUES (5, '2019-04-14 12:30:53.883', '2019-04-14 12:30:53.883', 0, true, '2019-04-02', '2019-04-02');
INSERT INTO public.vendu_in_banque VALUES (6, '2019-04-14 12:36:06.86', '2019-04-14 12:36:06.86', 0, true, '2019-03-18', '2019-03-18');
INSERT INTO public.vendu_in_banque VALUES (7, '2019-04-14 13:03:41.625', '2019-04-14 13:03:41.625', 0, true, '2019-02-06', '2019-02-06');


--
-- TOC entry 2987 (class 0 OID 0)
-- Dependencies: 223
-- Name: banque_commande_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banque_commande_id_seq', 1, false);


--
-- TOC entry 2988 (class 0 OID 0)
-- Dependencies: 217
-- Name: banque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banque_id_seq', 10, true);


--
-- TOC entry 2989 (class 0 OID 0)
-- Dependencies: 218
-- Name: banque_vendu_in_banque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banque_vendu_in_banque_id_seq', 2, true);


--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 220
-- Name: commande_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commande_id_seq', 4, true);


--
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 221
-- Name: commande_produit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.commande_produit_id_seq', 1, false);


--
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 215
-- Name: historique_produit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.historique_produit_id_seq', 3, true);


--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 212
-- Name: marchandise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marchandise_id_seq', 7, true);


--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 213
-- Name: marchandise_produit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.marchandise_produit_id_seq', 1, false);


--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 204
-- Name: produit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.produit_id_seq', 2, true);


--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 199
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_role_id_seq', 1, false);


--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 201
-- Name: user_roles_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_roles_user_id_seq', 1, false);


--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 197
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 208
-- Name: vendu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendu_id_seq', 9, true);


--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 206
-- Name: vendu_in_banque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendu_in_banque_id_seq', 7, true);


--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 209
-- Name: vendu_produit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendu_produit_id_seq', 1, false);


--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 210
-- Name: vendu_vendu_in_banque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendu_vendu_in_banque_id_seq', 1, false);


--
-- TOC entry 2805 (class 2606 OID 59432)
-- Name: banque banque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banque
    ADD CONSTRAINT banque_pkey PRIMARY KEY (id);


--
-- TOC entry 2807 (class 2606 OID 59481)
-- Name: commande commande_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande
    ADD CONSTRAINT commande_pkey PRIMARY KEY (id);


--
-- TOC entry 2787 (class 2606 OID 57700)
-- Name: users email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_unique UNIQUE (email);


--
-- TOC entry 2784 (class 2606 OID 57686)
-- Name: flyway_schema_history flyway_schema_history_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flyway_schema_history
    ADD CONSTRAINT flyway_schema_history_pk PRIMARY KEY (installed_rank);


--
-- TOC entry 2803 (class 2606 OID 57820)
-- Name: historique_produit historique_produit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.historique_produit
    ADD CONSTRAINT historique_produit_pkey PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 57804)
-- Name: marchandise marchandise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marchandise
    ADD CONSTRAINT marchandise_pkey PRIMARY KEY (id);


--
-- TOC entry 2795 (class 2606 OID 57740)
-- Name: produit produit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produit
    ADD CONSTRAINT produit_pkey PRIMARY KEY (id);


--
-- TOC entry 2791 (class 2606 OID 57708)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 2793 (class 2606 OID 57719)
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- TOC entry 2789 (class 2606 OID 57698)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2797 (class 2606 OID 57749)
-- Name: vendu_in_banque vendu_in_banque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu_in_banque
    ADD CONSTRAINT vendu_in_banque_pkey PRIMARY KEY (id);


--
-- TOC entry 2799 (class 2606 OID 57763)
-- Name: vendu vendu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu
    ADD CONSTRAINT vendu_pkey PRIMARY KEY (id);


--
-- TOC entry 2785 (class 1259 OID 57687)
-- Name: flyway_schema_history_s_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX flyway_schema_history_s_idx ON public.flyway_schema_history USING btree (success);


--
-- TOC entry 2814 (class 2606 OID 59497)
-- Name: banque fk_banque_commande; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banque
    ADD CONSTRAINT fk_banque_commande FOREIGN KEY (commande_id) REFERENCES public.commande(id);


--
-- TOC entry 2815 (class 2606 OID 59482)
-- Name: commande fk_commande_produit; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.commande
    ADD CONSTRAINT fk_commande_produit FOREIGN KEY (produit_id) REFERENCES public.produit(id);


--
-- TOC entry 2812 (class 2606 OID 57805)
-- Name: marchandise fk_produit_marchandise; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.marchandise
    ADD CONSTRAINT fk_produit_marchandise FOREIGN KEY (produit_id) REFERENCES public.produit(id);


--
-- TOC entry 2810 (class 2606 OID 57764)
-- Name: vendu fk_produit_vendu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu
    ADD CONSTRAINT fk_produit_vendu FOREIGN KEY (produit_id) REFERENCES public.produit(id);


--
-- TOC entry 2809 (class 2606 OID 57725)
-- Name: user_roles fk_role_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_role_user FOREIGN KEY (role_id) REFERENCES public.role(id);


--
-- TOC entry 2808 (class 2606 OID 57720)
-- Name: user_roles fk_user_roles; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fk_user_roles FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2813 (class 2606 OID 59433)
-- Name: banque fk_vendu_in_banque_banque; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banque
    ADD CONSTRAINT fk_vendu_in_banque_banque FOREIGN KEY (vendu_in_banque_id) REFERENCES public.vendu_in_banque(id);


--
-- TOC entry 2811 (class 2606 OID 57769)
-- Name: vendu fk_vendu_in_banque_vendu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vendu
    ADD CONSTRAINT fk_vendu_in_banque_vendu FOREIGN KEY (vendu_in_banque_id) REFERENCES public.vendu_in_banque(id);


-- Completed on 2019-04-29 11:09:34

--
-- PostgreSQL database dump complete
--

