# Origin Access Control — secure way to let CloudFront read from S3
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.domain_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront function: append index.html to directory requests
resource "aws_cloudfront_function" "rewrite" {
  name    = "${replace(var.project_name, "-", "_")}_url_rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite URIs to append index.html for Hugo clean URLs"
  publish = true
  code    = <<-EOF
    function handler(event) {
      var request = event.request;
      var uri = request.uri;

      // If URI ends with / append index.html
      if (uri.endsWith('/')) {
        request.uri += 'index.html';
      }
      // If URI doesn't have an extension, append /index.html
      else if (!uri.includes('.')) {
        request.uri += '/index.html';
      }

      return request;
    }
  EOF
}

# Define where the site will be cached to faster access
resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = [var.domain_name, "www.${var.domain_name}"]
  price_class         = "PriceClass_200" # US, Canada, Europe, Asia, Africa
  comment             = "${var.project_name} Hugo site"

  # Defines where CloudFront fetches content from
  # Use the S3 bucket's regional endpoint to avoid redirection
  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "S3-${var.domain_name}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  # Default cache behavior
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "S3-${var.domain_name}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    # Use managed CachingOptimized policy
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.rewrite.arn
    }
  }

  # Custom error responses for Hugo 404 page
  custom_error_response {
    error_code            = 403
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  custom_error_response {
    error_code            = 404
    response_code         = 404
    response_page_path    = "/404.html"
    error_caching_min_ttl = 60
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.site.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  # Restric access from specific countries
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Name = "${var.project_name}-cdn"
  }
}
