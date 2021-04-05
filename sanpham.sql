PGDMP     4                    y            sanpham    10.16    10.16     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �
           1262    16393    sanpham    DATABASE     �   CREATE DATABASE sanpham WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE sanpham;
             postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �
           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �
           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16412    product_info    TABLE     �   CREATE TABLE public.product_info (
    id bigint NOT NULL,
    product_name text,
    product_price bigint NOT NULL,
    image text
);
     DROP TABLE public.product_info;
       public         postgres    false    3            �            1259    16408    product_info_id_seq    SEQUENCE     |   CREATE SEQUENCE public.product_info_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.product_info_id_seq;
       public       postgres    false    198    3            �
           0    0    product_info_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.product_info_id_seq OWNED BY public.product_info.id;
            public       postgres    false    196            �            1259    16410    product_info_product_price_seq    SEQUENCE     �   CREATE SEQUENCE public.product_info_product_price_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.product_info_product_price_seq;
       public       postgres    false    3    198            �
           0    0    product_info_product_price_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.product_info_product_price_seq OWNED BY public.product_info.product_price;
            public       postgres    false    197            q
           2604    16415    product_info id    DEFAULT     r   ALTER TABLE ONLY public.product_info ALTER COLUMN id SET DEFAULT nextval('public.product_info_id_seq'::regclass);
 >   ALTER TABLE public.product_info ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    198    196    198            r
           2604    16416    product_info product_price    DEFAULT     �   ALTER TABLE ONLY public.product_info ALTER COLUMN product_price SET DEFAULT nextval('public.product_info_product_price_seq'::regclass);
 I   ALTER TABLE public.product_info ALTER COLUMN product_price DROP DEFAULT;
       public       postgres    false    197    198    198            �
          0    16412    product_info 
   TABLE DATA               N   COPY public.product_info (id, product_name, product_price, image) FROM stdin;
    public       postgres    false    198   g       �
           0    0    product_info_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.product_info_id_seq', 16, true);
            public       postgres    false    196            �
           0    0    product_info_product_price_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.product_info_product_price_seq', 1, false);
            public       postgres    false    197            t
           2606    16421    product_info product_info_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.product_info
    ADD CONSTRAINT product_info_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.product_info DROP CONSTRAINT product_info_pkey;
       public         postgres    false    198            �
   �  x��T]��@}���nf����v�]dU��.�d��m:��L�v_}�U�EA���q����[��I&�s�=�t�ji��_}A!�qc���^J�T�J��ڿ��ܟI��#잕����Z��kZ����^.	�����r$��9`�{$:.���|�C}^��7�w�;�,7r��6[lp}[�;������#�4j��x��^b��H��A�#z8Y��A&���b�� �l��d���Sr��UJ��ƶ��n���b)Eƕʠ�b�t%�Bh�̘���dca*PcЌf�N`�2#�*��`�LDVmĆ����^W����\ϳ]���C�mp#���hWϥc�j��"A�y�i���нW�
2�a��i�z��\����D�/J��F3�K1�َ��8���A������.?XO�ٔE� =���.����Kpٴ(�	��L:�h���Ȱ�Ȋ�B7�f�~�!	C�O��v�1������$����#'����������C��O��w��#�:[��*gV�ow�]�����m��T7�S�˭P���ӔCfۥ`�@�
�)H.�=�� ��A4lW���]��5��e3S3�L���F�M�tS
��5C��v��v��1����lbv'�Ym4��͋А��֮ަΤ]����^��,�G~[ɦz��P��Q#���䵰�6U�����a���bѬ3�j�����ִ�13)�S��M�������t}     