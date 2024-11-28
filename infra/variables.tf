variable "vpc_prefix" {
  description = "ip/netmask for virtual private cloud"
  type        = string
}

variable "subnet_prefix" {
  description = "ip/netmask for subnet"
  type        = string
}

variable "server_ip" {
  description = "private ip of server"
  type        = string
}
