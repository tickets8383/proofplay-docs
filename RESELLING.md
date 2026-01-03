# Reselling and White-Label Guide

This guide explains how you can integrate the GPM-SC Reasoning Verifier API into your own products and services, including reselling to your customers.

## Overview

The GPM-SC API can be integrated into commercial products, SaaS platforms, and services. Resellers can charge their own customers while using our API infrastructure.

## Current Pricing Tiers

- **Free**: $0/month - Logic verification, paradox detection (10 req/min)
- **Pro**: $29/month - Higher rate limits (1000 req/min), priority support
- **Enterprise**: Custom pricing - Unlimited usage, SLA, dedicated support

Available on [RapidAPI](https://rapidapi.com/watkins905/api/gpm-sc-reasoning-verifier/).

## Reseller Model

### How It Works

1. **Subscribe** to a tier on RapidAPI (e.g., Pro tier at $29/month)
2. **Integrate** the API into your product or service
3. **Charge** your customers your own pricing
4. **Keep** the difference as profit

### Example Scenarios

#### Educational Platform
- **Your Service**: Logic/philosophy teaching platform for students
- **Your Pricing**: $9.99/month per student
- **Your Cost**: $29/month (Pro tier)
- **Profit**: Serve 100+ students = significant margin

#### Research Tool
- **Your Service**: Academic research platform for paradox analysis
- **Your Pricing**: $49/month per researcher
- **Your Cost**: $29/month (Pro tier)
- **Profit**: Serve multiple researchers = profitable at scale

#### Legal Tech Platform
- **Your Service**: Contract analysis with logic verification
- **Your Pricing**: $499/month per law firm
- **Your Cost**: Enterprise tier (custom pricing)
- **Profit**: High-value service with strong margins

## Integration

### Quick Start

1. **Get API Key**: Subscribe on RapidAPI and get your API key
2. **Integrate**: Use the API in your backend service
3. **Build UI**: Create your own user interface
4. **Launch**: Charge your customers

### Code Example

```python
import requests

def verify_proposition(proposition, api_key):
    """Call GPM-SC API from your backend."""
    response = requests.post(
        "https://gpmsc-api.onrender.com/verify",
        json={"proposition": proposition},
        headers={
            "X-RapidAPI-Key": api_key,
            "X-RapidAPI-Host": "gpmsc-api.onrender.com",
            "Content-Type": "application/json"
        }
    )
    return response.json()

# Use in your service
result = verify_proposition("p → p", YOUR_API_KEY)
# Present result to your customers through your UI
```

See the [API Documentation](API.md) for complete endpoint reference.

## Value-Add Opportunities

Don't just resell—add value:

- **Better UI/UX**: Build intuitive interfaces for your domain
- **Domain-Specific Features**: Add features relevant to your market
- **Integration**: Connect with other tools your customers use
- **Support**: Provide domain-specific support
- **Custom Workflows**: Build workflows that match your customers' needs

## Pricing Your Service

### Pricing Strategies

1. **Per-User Pricing**: Charge per user/month
2. **Usage-Based**: Charge per API call or verification
3. **Tiered Plans**: Offer multiple tiers (Basic, Pro, Enterprise)
4. **One-Time Fees**: Charge setup or license fees

### Cost Considerations

- **API Costs**: Your RapidAPI subscription
- **Infrastructure**: Hosting your UI/service
- **Support**: Customer support costs
- **Margin**: Target 60-80% gross margin

## Terms and Conditions

### Permitted Uses

✅ Commercial use in your products  
✅ Reselling to your customers  
✅ Integration into SaaS platforms  
✅ White-label applications (Enterprise tier)

### Requirements

- Attribute the API provider appropriately
- Follow rate limits for your tier
- Comply with API terms of service
- No abuse or prohibited uses

### Attribution

Standard tiers require attribution. Enterprise tier may include white-label options (contact for details).

## Enterprise/Partner Options

For high-volume resellers or white-label needs:

- **Custom Pricing**: Volume-based or flat-rate pricing
- **SLA Guarantees**: Service level agreements
- **White-Label**: Remove branding requirements
- **Dedicated Support**: Priority support channels
- **Co-Marketing**: Partnership opportunities

Contact us to discuss enterprise options.

## Best Practices

### For Resellers

1. **Add Value**: Don't just proxy the API—build a complete solution
2. **Clear Pricing**: Transparent pricing for your customers
3. **Good Documentation**: Help your customers use your service
4. **Reliable Service**: Ensure high uptime for your customers
5. **Support**: Provide domain-specific customer support

### Technical

1. **Caching**: Cache results when appropriate to reduce API calls
2. **Error Handling**: Gracefully handle API errors
3. **Rate Limiting**: Respect API rate limits
4. **Monitoring**: Monitor your API usage and costs
5. **Scaling**: Plan for growth in your customer base

## Getting Started

1. **Review API Documentation**: Understand available endpoints
2. **Subscribe on RapidAPI**: Get your API key
3. **Build Integration**: Integrate into your service
4. **Test Thoroughly**: Ensure reliability
5. **Launch**: Start serving customers

## Support

- **API Documentation**: See [API.md](API.md)
- **Examples**: See [examples/](examples/)
- **RapidAPI**: [API Listing](https://rapidapi.com/watkins905/api/gpm-sc-reasoning-verifier/)
- **Enterprise Inquiries**: Contact for custom options

---

**Note**: This reselling model allows you to build valuable services on top of our API infrastructure while we handle the complexity of logic verification, scaling, and maintenance. It's a win-win: you get a powerful API without building it, we get recurring revenue.

