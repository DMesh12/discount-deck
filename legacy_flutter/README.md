# Discount Deck MVP

A "Super-Wallet" mobile app that aggregates gift cards, loyalty clubs, and coupons into one optimized view. It features a smart "Redemption Engine" for maximizing savings at the POS and a P2P "Liquidity Exchange" for selling unwanted cards.

## Features

- **Smart Dashboard**: View total savings potential and recent assets.
- **Optimization Engine**: Automatically sorts redemption steps (Gift Card > Coupon > Membership) when a store is selected.
- **Liquidity Exchange**: Sell unwanted gift cards for cash/credit or buy discounted cards from others.
- **Premium UI**: Material 3 design with a FinTech aesthetic.

## Project Structure

```
lib/
├── data/               # Mock data repositories
├── logic/              # Business logic (Optimizer, Marketplace)
├── models/             # Data models (Asset, Store, Listing)
├── providers/          # Riverpod state providers
├── screens/            # Application screens
├── widgets/            # Reusable UI components
└── main.dart           # Entry point and Theme setup
```

## Getting Started

This project is delivered as source code. To run it, you need the Flutter SDK installed on your machine.

1. **Create the Platform Scaffolding:**
   If you only have the `lib` folder and `pubspec.yaml`, run:
   ```bash
   flutter create .
   ```

2. **Install Dependencies:**
   ```bash
   flutter pub get
   ```

3. **Run the App:**
   ```bash
   flutter run
   ```

## Key Flows to Test

1. **Dashboard**: Check your "Total Savings".
2. **Optimizer**: Tap "Simulate POS" to see the smart redemption logic for Super-Pharm.
3. **Marketplace (Buyer)**: Click the "Market" (Bag) icon in Quick Actions to buy discounted cards.
4. **Marketplace (Seller)**: Long-press any asset on the dashboard to list it for sale.
