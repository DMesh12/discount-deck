import 'package:flutter/material.dart';
import '../models/asset_model.dart';
import '../models/store_model.dart';

class MockRepository {
  static final List<Store> stores = [
    Store(
      id: '1',
      name: 'Zara',
      logoUrl: 'assets/logos/zara.png', // Placeholder
      category: 'Fashion',
      latitude: 32.0740,
      longitude: 34.7900,
    ),
    Store(
      id: '2',
      name: 'Super-Pharm',
      logoUrl: 'assets/logos/superpharm.png', // Placeholder
      category: 'Health',
      latitude: 32.0745,
      longitude: 34.7905,
    ),
    Store(
      id: '3',
      name: 'Aroma Espresso Bar',
      logoUrl: 'assets/logos/aroma.png', // Placeholder
      category: 'Food',
      latitude: 32.0750,
      longitude: 34.7910,
    ),
  ];

  static final List<Asset> assets = [
    Asset(
      id: '101',
      storeId: '1',
      storeName: 'Zara',
      type: AssetType.giftCard,
      value: 300.0,
      expiryDate: DateTime.now().add(const Duration(days: 365)),
      barcodeData: 'ZARA-1234-5678',
      terms: 'Valid at all Zara locations locally.',
      customColor: const Color(0xFF1E1E1E), // Zara Black
    ),
    Asset(
      id: '102',
      storeId: '2',
      storeName: 'Super-Pharm',
      type: AssetType.clubMembership,
      value: 0.0, // Membership usually has no direct cash value
      expiryDate: DateTime.now().add(const Duration(days: 700)),
      barcodeData: 'SP-MEMBER-999',
      terms: '15% off on brand products.',
      customColor: const Color(0xFF005698), // Super-Pharm Blue
    ),
    Asset(
      id: '103',
      storeId: '3',
      storeName: 'Aroma',
      type: AssetType.coupon,
      value: 15.0, // Equivalent value of free coffee
      expiryDate: DateTime.now().add(const Duration(days: 7)),
      barcodeData: 'AROMA-COFFEE-FREE',
      terms: 'One free standard coffee.',
      customColor: const Color(0xFFD32F2F), // Aroma Red
    ),
    // SCENARIO: Super-Pharm Optimization
    Asset(
      id: '201',
      storeId: '2',
      storeName: 'Super-Pharm',
      type: AssetType.giftCard,
      value: 100.0,
      expiryDate: DateTime.now().add(const Duration(days: 90)),
      barcodeData: 'SP-GIFT-100',
      terms: 'Store credit.',
      customColor: const Color(0xFF005698),
    ),
    Asset(
      id: '202',
      storeId: '2',
      storeName: 'Super-Pharm',
      type: AssetType.coupon,
      value: 0.0, // Percentage based
      expiryDate: DateTime.now().add(const Duration(days: 30)),
      barcodeData: 'SP-COUPON-15',
      terms: '15% off Shampoo',
      customColor: const Color(0xFF005698),
    ),
    Asset(
      id: '203',
      storeId: '2',
      storeName: 'Super-Pharm',
      type: AssetType.clubMembership,
      value: 0.0,
      expiryDate: DateTime.now().add(const Duration(days: 999)),
      barcodeData: 'SP-CLUB-888',
      terms: 'Accumulate points',
      customColor: const Color(0xFF005698),
    ),
  ];

  Future<List<Asset>> getAssets() async {
    await Future.delayed(const Duration(milliseconds: 500)); // Simulate latency
    return assets;
  }

  Future<List<Store>> getStores() async {
    await Future.delayed(const Duration(milliseconds: 500));
    return stores;
  }
}
