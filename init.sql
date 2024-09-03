CREATE DATABASE IF NOT EXISTS nest_database;
USE nest_database;

CREATE TABLE IF NOT EXISTS banner(
  banner_id int NOT NULL AUTO_INCREMENT,
  banner_src varchar(300) NOT NULL,
  banner_title varchar(100),
  banner_description varchar(200),
  banner_link varchar(300),
  banner_status int NOT NULL,
  banner_order int NOT NULL,
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (banner_id)
);

CREATE TABLE IF NOT EXISTS menu(
  menu_id int NOT NULL AUTO_INCREMENT,
  menu_name varchar(100) NOT NULL,
  menu_type int NOT NULL,
  menu_link_type int NOT NULL,
  menu_link_id varchar(300) NOT NULL,
  menu_status int NOT NULL,
  menu_order int NOT NULL,
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (menu_id)
);

CREATE TABLE IF NOT EXISTS page(
  page_id int NOT NULL AUTO_INCREMENT,
  page_title varchar(100) NOT NULL,
  page_banners text,
  page_banner_video_id int,
  page_banner_video_post_src varchar(300),
  page_banner_video_src varchar(300),
  page_top_nav text,
  page_rich_text text,
  page_bottom_nav text,
  page_identifier varchar(20),
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (page_id)
);

CREATE TABLE IF NOT EXISTS video(
  video_id int NOT NULL AUTO_INCREMENT,
  video_src varchar(300) NOT NULL,
  video_poster varchar(300) NOT NULL,
  video_title varchar(100) NOT NULL,
  video_name varchar(100) NOT NULL,
  video_description varchar(200),
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (video_id)
);

CREATE TABLE IF NOT EXISTS account(
  account_id int NOT NULL AUTO_INCREMENT,
  account_email varchar(50) NOT NULL,
  account_type int NOT NULL,
  account_password char(60) NOT NULL,
  account_company_ids varchar(100),
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (account_id)
);

CREATE TABLE IF NOT EXISTS company(
  company_id int NOT NULL AUTO_INCREMENT,
  company_name varchar(100) NOT NULL,
  company_intro varchar(200) NOT NULL,
  company_address varchar(200) NOT NULL,
  company_coordinate varchar(30),
  company_order int NOT NUlL,
  company_description text NOT NULL,
  company_policy text NOT NULL,
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (company_id)
);

CREATE TABLE IF NOT EXISTS label_category(
  label_category_id int NOT NULL AUTO_INCREMENT,
  label_category_name varchar(100) NOT NULL,
  label_category_type int NOT NULL,
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (label_category_id)
);
INSERT INTO label_category(
  label_category_name,
  label_category_type,
  create_time,
  update_time
) VALUES
("薪资", 1, NOW(), NOW()),
("福利", 2, NOW(), NOW()),

CREATE TABLE IF NOT EXISTS label(
  label_id int NOT NULL AUTO_INCREMENT,
  label_name varchar(100) NOT NULL,
  label_category_id int NOT NULL,
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (label_id)
);
INSERT INTO label(
  label_name,
  label_category_id,
  create_time,
  update_time
) VALUES
("2,500-5,000", 1, NOW(), NOW()),
("5,000-10,000", 1, NOW(), NOW()),
("绩效奖金", 2, NOW(), NOW()),
("员工体检", 2, NOW(), NOW()),
("1-2年", 3, NOW(), NOW()),
("3-5年", 3, NOW(), NOW()),
("深圳", 4, NOW(), NOW()),
("香港", 4, NOW(), NOW()),
("居家办公", 5, NOW(), NOW());

CREATE TABLE IF NOT EXISTS job(
  job_id int NOT NULL AUTO_INCREMENT,
  job_title varchar(100) NOT NULL,
  job_department varchar(100) NOT NULL,
  job_company_id int NOT NULL,
  job_label_ids varchar(100),
  job_detail text NOT NUlL,
  job_status int NOT NULL,
  job_custom_salary varchar(30),
  create_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (job_id)
);

CREATE TABLE IF NOT EXISTS application(
  application_id int NOT NULL AUTO_INCREMENT,
  applicant_name varchar(20) NOT NULL,
  applicant_contact varchar(30) NOT NULL,
  applicant_resume_src varchar(300) NOT NULL,
  application_status int NOT NULL,
  application_job_title varchar(100) NOT NULL,
  application_company_id int NOT NULL,
  application_department varchar(100) NOT NULL,
  application_job_id int NOT NULL,
  applicant_openid varchar(30) NOT NULL,
  application_company_name VARCHAR(100) NOT NULL,
  apply_time datetime NOT NULL,
  update_time datetime NOT NULL,
  PRIMARY KEY (application_id)
);
