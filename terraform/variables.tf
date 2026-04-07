variable "aws_region" {
  description = "AWS region: us-east-1 for CloudFront and ACM"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for resource naming and tagging"
  type        = string
  default     = "creymond-site"
}

variable "domain_name" {
  description = "The root domain name"
  type        = string
}

variable "hosted_zone_id" {
  description = "Route 53 Hosted Zone ID for the domain"
  type        = string
}
