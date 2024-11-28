resource "aws_db_instance" "kaktus-rds" {
  instance_class      = "db.t3.micro"
  engine              = "postgres"
  engine_version      = "16.3"
  allocated_storage   = 20
  storage_type        = "gp2"
  identifier          = "kaktus-db"
  username            = "kaktus_admin"
  password            = "kaktus_admin"
  publicly_accessible = true
  skip_final_snapshot = true

  tags = {
    Name = "kaktus-db"
  }
}
