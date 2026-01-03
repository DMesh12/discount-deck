class MarketListing {
  final String id;
  final String assetId;
  final String storeName; // For display
  final String storeLogoUrl; // For display
  final double faceValue;
  final double sellerAskPrice;
  final double platformFee;
  final double buyerPrice;
  final int discountPercent;

  MarketListing({
    required this.id,
    required this.assetId,
    required this.storeName,
    required this.storeLogoUrl,
    required this.faceValue,
    required this.sellerAskPrice,
    required this.platformFee,
    required this.buyerPrice,
    required this.discountPercent,
  });
}
