import 'package:flutter/material.dart';

enum AssetType {
  giftCard,
  coupon,
  clubMembership,
}

class Asset {
  final String id;
  final String storeId;
  final String storeName;
  final AssetType type;
  final double value;
  final DateTime expiryDate;
  final String barcodeData;
  final String terms;
  final Color? customColor;

  Asset({
    required this.id,
    required this.storeId,
    required this.storeName,
    required this.type,
    required this.value,
    required this.expiryDate,
    required this.barcodeData,
    this.terms = '',
    this.customColor,
  });
}
