# US-002: Subscription Management with Plan Upgrades/Downgrades

**Status:** In Progress (75% complete)
**Priority:** P0 (Critical)
**Created:** 2025-09-15
**Target Completion:** 2025-11-22
**Current Sprint:** Sprint 7 (Nov 11-24, 2025)
**Owner:** Elena Popov (Backend), Marcus Rodriguez (Frontend)

## User Story

**As an** organization owner
**I want** to subscribe to a plan, upgrade/downgrade my subscription, and manage payment methods
**So that** I can access SubscriptFlow features based on my billing tier and control my subscription lifecycle

## Context & Background

Subscription management is core to our SaaS business model. Organizations need to purchase subscriptions, change plans as they grow, and manage payment methods seamlessly. This feature directly impacts revenue and user retention.

### Business Value

- **Revenue Generation:** Primary monetization mechanism
- **Self-Service:** Reduce support burden with automated subscription management
- **Expansion Revenue:** Easy upgrades enable upsells
- **Churn Reduction:** Flexible downgrades prevent cancellations

### Key Business Requirements

- Support monthly and annual billing cycles
- Allow mid-cycle plan changes with proration
- Accept credit cards via Stripe (no card storage)
- Generate invoices automatically
- Handle failed payments gracefully

## Acceptance Criteria

### AC1: View Available Plans

**Given** I am logged in as an organization owner without an active subscription
**When** I navigate to the billing page
**Then** I see all available subscription plans displayed in a pricing table
**And** each plan shows: name, price, billing interval (monthly/yearly), and feature list
**And** I see a "Subscribe" button for each plan

**Plan Tiers:**

- **Starter:** $29/month or $290/year (save 17%), up to 100 end-users
- **Professional:** $99/month or $990/year, up to 1000 end-users
- **Enterprise:** $299/month or $2990/year, unlimited end-users

**Feature Comparison:**
| Feature | Starter | Professional | Enterprise |
| ---------------------- | ------- | ------------ | ---------- |
| End Users | 100 | 1,000 | Unlimited |
| Team Members | 3 | 10 | Unlimited |
| API Access | ❌ | ✅ | ✅ |
| Advanced Analytics | ❌ | ✅ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |
| Custom Integrations | ❌ | ❌ | ✅ |
| SLA Guarantee | ❌ | ❌ | 99.9% |

### AC2: Subscribe to a Plan

**Given** I have selected a plan (e.g., Professional - Monthly)
**When** I click "Subscribe" and enter payment information via Stripe Checkout
**And** I complete the payment process
**Then** my subscription is activated immediately
**And** I receive a confirmation email with invoice
**And** I am redirected to the dashboard with access to plan features
**And** my next billing date is displayed (e.g., "Next billing: Dec 18, 2025")

**Payment Flow:**

1. Click "Subscribe" button
2. Redirect to Stripe Checkout hosted page
3. Enter card details (Stripe handles card entry, not our app)
4. Submit payment
5. Stripe sends webhook to our backend
6. Backend creates subscription record
7. User redirected to dashboard

**Database Updates:**

- `subscriptions` table: New record created
- `invoices` table: First invoice created (status: paid)
- `payment_methods` table: Card saved as default method
- `audit_logs` table: Subscription creation logged

### AC3: View Current Subscription

**Given** I have an active subscription
**When** I navigate to the billing page
**Then** I see my current subscription details:

- Plan name and price
- Billing interval (monthly/yearly)
- Current billing cycle dates
- Next billing date and amount
- Payment method (last 4 digits of card)
- Invoice history (download PDFs)

**Example Display:**

```
Current Plan: Professional (Monthly)
Price: $99/month
Current Period: Nov 18 - Dec 18, 2025
Next Billing: Dec 18, 2025 ($99.00)
Payment Method: Visa ending in 4242
Status: Active
```

### AC4: Upgrade Subscription (Mid-Cycle)

**Given** I have an active Starter subscription (monthly, $29/month)
**And** I'm in the middle of my billing cycle (Day 15 of 30)
**When** I upgrade to Professional ($99/month)
**Then** the upgrade takes effect immediately
**And** I'm charged a prorated amount for the remaining days: ~$35 ((99-29) \* 15/30)
**And** my next full billing is $99 on the new cycle start date
**And** I immediately gain access to Professional features
**And** I see a success message: "Upgraded to Professional! You've been charged $35.00 for the prorated amount."

**Proration Calculation:**

```
Old plan: $29/month (15 days remaining)
New plan: $99/month (15 days charged)

Proration:
- Refund for unused Starter: $29 * (15/30) = $14.50
- Charge for Professional: $99 * (15/30) = $49.50
- Net charge: $49.50 - $14.50 = $35.00
```

### AC5: Downgrade Subscription (End of Cycle)

**Given** I have an active Professional subscription ($99/month)
**And** I want to downgrade to Starter ($29/month)
**When** I select downgrade and confirm
**Then** the downgrade is scheduled for the end of my current billing cycle
**And** I see a message: "Downgrade to Starter scheduled for Dec 18, 2025. You'll keep Professional features until then."
**And** I continue to have Professional access until the cycle ends
**And** On Dec 18, I'm automatically moved to Starter and charged $29

**Reason for End-of-Cycle Downgrade:**

- User paid for Professional access this month - let them keep it
- Prevents refund complexity
- Standard SaaS pattern (Stripe, Heroku, etc.)
- Clear expectations for users

### AC6: Change from Monthly to Annual Billing

**Given** I have a Professional subscription (monthly, $99/month)
**When** I switch to annual billing
**Then** I'm charged immediately for the full year: $990
**And** my unused monthly period is prorated and credited: ~$50 (if mid-cycle)
**And** my next billing date is 1 year from now
**And** I see savings highlighted: "Save $198/year (17% discount)"

### AC7: Update Payment Method

**Given** I have an active subscription
**When** I navigate to billing settings and click "Update Payment Method"
**Then** I'm redirected to Stripe's payment method update flow
**And** I can add a new card or select from saved cards
**And** after updating, I see the new card as my default payment method
**And** future charges use the new payment method

**Edge Case:** If payment method update fails during subscription renewal, user receives email notification and subscription enters "past_due" status (7-day grace period).

### AC8: Cancel Subscription

**Given** I have an active subscription
**When** I click "Cancel Subscription" and confirm the action
**Then** I see a cancellation survey asking why I'm canceling (optional)
**And** I'm asked to choose:

- Cancel immediately (lose access now, no refund)
- Cancel at end of billing period (keep access until then)
  **And** after confirming, my subscription is canceled
  **And** I receive a cancellation confirmation email
  **And** (if end-of-period) I keep access until the paid period ends

**Cancellation Survey Options:**

- Too expensive
- Missing features I need
- Switching to competitor
- No longer need the service
- Technical issues
- Other (free text)

### AC9: Reactivate Canceled Subscription

**Given** my subscription was canceled but is still in the paid period
**When** I click "Reactivate Subscription" on the billing page
**Then** the cancellation is reversed
**And** my subscription continues normally at the next billing date
**And** I see a success message: "Subscription reactivated! Your next billing date is Dec 18, 2025."

### AC10: View Invoice History

**Given** I have had a subscription for multiple billing cycles
**When** I navigate to the "Invoices" tab on the billing page
**Then** I see a list of all past invoices with:

- Invoice number (e.g., INV-2025-0042)
- Date issued
- Amount charged
- Status (Paid, Failed, Refunded)
- Download PDF button

**And** I can click "Download PDF" to get a printable invoice
**And** each PDF includes:

- Organization name and address
- Invoice date and number
- Line items (subscription, prorations, discounts)
- Payment method used
- Total amount charged
- SubscriptFlow company details for accounting

## Edge Cases & Error Scenarios

### Edge Case 1: Failed Payment on Subscription Renewal

**Given** my subscription is set to renew tomorrow
**When** Stripe attempts to charge my card and it's declined
**Then** I receive an email notification: "Payment failed for your SubscriptFlow subscription"
**And** my subscription status changes to "past_due"
**And** I have a 7-day grace period to update my payment method
**And** during the grace period, I retain full access to features
**And** if I don't update within 7 days, subscription is canceled

**Recovery Flow:**

- Day 0: First failed charge, email sent
- Day 2: Second retry, email if failed again
- Day 4: Third retry, email if failed again
- Day 7: Final notice, subscription will be canceled tomorrow
- Day 8: Subscription canceled, downgraded to free tier (if applicable) or lose access

### Edge Case 2: Upgrade While Having Past Due Invoice

**Given** my subscription is "past_due" due to failed payment
**When** I attempt to upgrade to a higher plan
**Then** I'm prompted to first resolve the past due invoice
**And** I see a message: "Please update your payment method before upgrading"
**And** after updating payment and resolving past due amount, I can proceed with upgrade

### Edge Case 3: Downgrade Below Current Usage

**Given** I'm on Professional plan (1000 end-user limit)
**And** I currently have 800 active end-users
**When** I try to downgrade to Starter (100 end-user limit)
**Then** I see a warning: "You have 800 end-users but Starter only supports 100. Please reduce your usage before downgrading."
**And** I cannot complete the downgrade until usage is under the limit
**And** I see a button: "Manage Users" to help reduce usage

### Edge Case 4: Multiple Payment Methods

**Given** I have saved multiple payment methods (2 credit cards)
**When** I view my billing page
**Then** I see all saved payment methods listed
**And** one is marked as "Default"
**And** I can set any card as default
**And** I can remove non-default cards
**And** I cannot remove the default card (must set another as default first)

### Edge Case 5: Subscription During Trial Period

**Given** I'm in a 14-day free trial period
**When** I subscribe to a paid plan
**Then** my trial is ended immediately
**And** I'm charged for the full first month
**And** I don't get "trial remaining days" credit
**And** I see a message: "Trial ended. You're now on the [Plan Name] plan."

**Note:** This example doesn't implement trials, but including for completeness.

### Edge Case 6: Currency and International Payments

**Given** I'm subscribing from outside the US
**When** I enter my payment information
**Then** prices are displayed in USD
**And** my card is charged in USD
**And** my bank may apply currency conversion fees (disclosed by Stripe)
**And** invoices show amounts in USD

**Future Enhancement:** Support EUR, GBP, CAD (planned Month 8).

### Edge Case 7: Refund Request

**Given** I canceled my subscription mid-cycle
**And** I want a refund for unused time
**When** I contact support
**Then** support can issue a prorated refund manually
**And** refund appears on my card in 5-10 business days
**And** I receive a refund invoice/credit memo

**Note:** Automated refunds not in MVP scope.

## Technical Implementation

### Frontend (React + TypeScript)

**Pages:**

- `/billing` - Main billing dashboard
- `/billing/plans` - Plan selection and comparison
- `/billing/checkout` - Stripe Checkout redirect (Stripe-hosted)
- `/billing/invoices` - Invoice history

**Components:**

- `PricingTable.tsx` - Display plans with features
- `SubscriptionCard.tsx` - Current subscription status
- `PaymentMethodCard.tsx` - Display and manage payment methods
- `InvoiceList.tsx` - Table of past invoices
- `CancellationModal.tsx` - Confirm cancellation with survey
- `UpgradeConfirmModal.tsx` - Confirm upgrade with proration preview

**State Management:**

- Redux slice: `subscriptionSlice.ts`
  - State: `{ currentSubscription, plans, invoices, paymentMethods, loading, error }`
  - Actions: `subscribe()`, `upgrade()`, `downgrade()`, `cancel()`, `updatePayment()`

### Backend (Node.js + Express + TypeScript)

**API Endpoints:**

```typescript
// Subscriptions
GET /api/subscriptions/plans - List available plans
GET /api/subscriptions/current - Get current subscription
POST /api/subscriptions/create - Create new subscription
PATCH /api/subscriptions/:id/upgrade - Upgrade plan
PATCH /api/subscriptions/:id/downgrade - Downgrade plan (scheduled)
DELETE /api/subscriptions/:id - Cancel subscription
POST /api/subscriptions/:id/reactivate - Reactivate canceled subscription

// Payment Methods
GET /api/payment-methods - List saved payment methods
POST /api/payment-methods - Add new payment method
PATCH /api/payment-methods/:id/set-default - Set as default
DELETE /api/payment-methods/:id - Remove payment method

// Invoices
GET /api/invoices - List invoices for organization
GET /api/invoices/:id/pdf - Download invoice PDF

// Stripe Webhooks
POST /api/webhooks/stripe - Handle Stripe events (payment success, failed, etc.)
```

**Stripe Integration:**

**Events We Handle:**

- `checkout.session.completed` - User completed checkout, create subscription
- `invoice.payment_succeeded` - Payment successful, update subscription status
- `invoice.payment_failed` - Payment failed, mark subscription as past_due
- `customer.subscription.updated` - Subscription changed (plan, status)
- `customer.subscription.deleted` - Subscription canceled by user or Stripe
- `payment_method.attached` - New payment method added
- `payment_method.detached` - Payment method removed

**Webhook Handler:**

```typescript
async function handleStripeWebhook(event: Stripe.Event) {
  // Verify webhook signature
  const sig = request.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const verifiedEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);

  // Handle event based on type
  switch (verifiedEvent.type) {
    case 'invoice.payment_succeeded':
      await handlePaymentSuccess(verifiedEvent.data.object);
      break;
    case 'invoice.payment_failed':
      await handlePaymentFailed(verifiedEvent.data.object);
      break;
    // ... other cases
  }

  // Return 200 immediately (Stripe retries if no 200)
  return res.json({ received: true });
}
```

**Proration Logic:**

```typescript
function calculateProration(currentPlan, newPlan, daysRemaining, daysInCycle) {
  const currentDailyRate = currentPlan.price / daysInCycle;
  const newDailyRate = newPlan.price / daysInCycle;

  const refundAmount = currentDailyRate * daysRemaining;
  const chargeAmount = newDailyRate * daysRemaining;

  const netCharge = chargeAmount - refundAmount;

  return {
    refund: refundAmount,
    charge: chargeAmount,
    netCharge: netCharge,
    daysRemaining: daysRemaining,
  };
}
```

### Database Schema Updates

**New Columns in `subscriptions` Table:**

```sql
ALTER TABLE subscriptions ADD COLUMN scheduled_plan_id UUID REFERENCES plans(id);
ALTER TABLE subscriptions ADD COLUMN scheduled_change_date TIMESTAMP;
ALTER TABLE subscriptions ADD COLUMN cancellation_reason VARCHAR(255);
ALTER TABLE subscriptions ADD COLUMN canceled_at TIMESTAMP;
```

**Usage for Scheduled Downgrades:**

- User requests downgrade on Nov 15
- `scheduled_plan_id` = new plan ID (Starter)
- `scheduled_change_date` = Dec 18 (end of current cycle)
- On Dec 18, cron job updates `plan_id` to `scheduled_plan_id`

## Testing Strategy

### Unit Tests

- Proration calculation accuracy
- Plan upgrade/downgrade logic
- Payment method validation
- Invoice PDF generation

### Integration Tests

```typescript
describe('POST /api/subscriptions/create', () => {
  it('creates subscription with valid payment', async () => {
    const response = await request(app)
      .post('/api/subscriptions/create')
      .send({
        organizationId: 'org-123',
        planId: 'plan-professional-monthly',
        paymentMethodId: 'pm_test_card',
      })
      .expect(201);

    expect(response.body.subscription).toHaveProperty('id');
    expect(response.body.subscription.status).toBe('active');
  });

  it('rejects subscription with invalid card', async () => {
    const response = await request(app)
      .post('/api/subscriptions/create')
      .send({
        organizationId: 'org-123',
        planId: 'plan-professional-monthly',
        paymentMethodId: 'pm_card_declined',
      })
      .expect(400);

    expect(response.body.error).toContain('Payment failed');
  });
});
```

### E2E Tests (Playwright)

```typescript
test('complete subscription purchase flow', async ({ page }) => {
  await page.goto('/billing/plans');

  // Select plan
  await page.click('button:has-text("Subscribe to Professional")');

  // Redirected to Stripe Checkout (use Stripe test mode)
  await page.fill('[name="cardNumber"]', '4242424242424242');
  await page.fill('[name="cardExpiry"]', '1225');
  await page.fill('[name="cardCvc"]', '123');
  await page.fill('[name="billingName"]', 'Test User');

  // Submit payment
  await page.click('button:has-text("Subscribe")');

  // Verify success
  await page.waitForURL('/dashboard');
  await expect(page.locator('text=Subscription Active')).toBeVisible();
});
```

## Performance Requirements

- **Subscription Creation:** < 2 seconds (including Stripe API call)
- **Plan Upgrade:** < 1 second response time
- **Invoice PDF Generation:** < 3 seconds
- **Webhook Processing:** < 500ms (to avoid Stripe retries)
- **Invoice List Loading:** < 500ms for 100 invoices

## Security Considerations

- **No Card Storage:** Stripe handles all card data (PCI DSS compliant)
- **Webhook Verification:** Validate Stripe signature on all webhook events
- **Authorization:** Only org owners can manage subscriptions
- **Idempotency:** Handle duplicate webhook events (Stripe may retry)
- **SQL Injection:** Use parameterized queries (Prisma ORM)
- **Rate Limiting:** Limit subscription API calls (5 per minute per org)

## Dependencies

- **Stripe Account:** Configured with products and prices
- **Stripe Webhook Endpoint:** Public URL for webhook delivery
- **PDF Generation Service:** Puppeteer for invoice PDFs
- **Email Service:** SendGrid for transactional emails
- **Completed:** User authentication (US-001)
- **Completed:** Organization management

## Success Metrics

### Completion Criteria

- [x] All 10 acceptance criteria implemented
- [x] Stripe integration tested end-to-end
- [x] Unit test coverage > 80%
- [x] Integration tests pass
- [ ] E2E tests pass (In progress - 80% complete)
- [ ] Invoice PDF generation works (In progress - 60% complete)
- [ ] Security review passed

### Business Metrics (Post-Launch)

- **Subscription Conversion:** > 25% of signups subscribe within 7 days
- **Upgrade Rate:** > 15% of Starter users upgrade to Professional within 6 months
- **Payment Failure Rate:** < 5% of renewal attempts
- **Cancellation Rate:** < 3% monthly churn
- **Customer Lifetime Value:** > $1000 average

## Related Documents

- [ADR-001: Tech Stack Choice](../architecture/ADR-001-tech-stack-choice.md)
- [ADR-002: Database Choice](../architecture/ADR-002-database-choice.md)
- [US-001: User Authentication](./US-001-user-authentication.md)
- [Project Progress](../project-progress.md)

## Notes & Decisions

### Decision Log

**2025-09-15:** Decided to use Stripe Checkout (hosted) instead of Stripe Elements (embedded) for faster implementation and better security

**2025-09-20:** Downgrades scheduled for end-of-cycle (not immediate) to avoid refund complexity

**2025-10-05:** Annual billing includes 17% discount ($990 vs $1188) to incentivize longer commitments

**2025-11-05:** Added usage-based checks for downgrades to prevent users from downgrading below their current usage

**2025-11-12:** Invoice PDF generation moved to async job queue (was blocking API requests)

### Current Status (Nov 18, 2025)

- ✅ Subscription creation: Complete
- ✅ Plan upgrades: Complete (testing)
- ✅ Payment method management: 95% complete
- 🔄 Invoice PDF generation: 60% complete (async processing in development)
- 🔄 E2E tests: 80% complete
- ⏳ Failed payment recovery flow: Planned for Sprint 8

---

**Document Owner:** Elena Popov (Backend Lead)
**Last Updated:** 2025-11-18
**Implementation PRs:** #234, #235, #237, #242 (in review)
**Test Coverage:** 84% (backend), 79% (frontend)
