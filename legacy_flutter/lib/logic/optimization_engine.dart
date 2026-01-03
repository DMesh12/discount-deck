import '../models/asset_model.dart';
import '../models/store_model.dart';
import '../models/redemption_step.dart';

class OptimizationEngine {
  
  static List<RedemptionStep> getBestStrategy(Store store, List<Asset> userAssets) {
    // 1. Filter assets for this store
    final storeAssets = userAssets.where((asset) => asset.storeId == store.id).toList();

    // 2. Sort assets based on priority rules
    storeAssets.sort((a, b) {
      // Rule 1: Urgent (Expiry < 48 hours)
      final aUrgent = _isUrgent(a);
      final bUrgent = _isUrgent(b);
      if (aUrgent && !bUrgent) return -1;
      if (!aUrgent && bUrgent) return 1;

      // Rule 2: Asset Type Priority
      final aPriority = _getTypePriority(a.type);
      final bPriority = _getTypePriority(b.type);
      if (aPriority != bPriority) {
        return aPriority.compareTo(bPriority);
      }
      
      // Secondary Sort: Higher value first for Gift Cards
      if (a.type == AssetType.giftCard && b.type == AssetType.giftCard) {
        return b.value.compareTo(a.value);
      }
      
      return 0;
    });

    // 3. Convert to Redemption Steps
    return List.generate(storeAssets.length, (index) {
      final asset = storeAssets[index];
      return RedemptionStep(
        asset: asset,
        instruction: _getInstruction(asset, index),
        orderIndex: index + 1,
      );
    });
  }

  static bool _isUrgent(Asset asset) {
    final now = DateTime.now();
    final difference = asset.expiryDate.difference(now);
    return difference.inHours < 48 && difference.inSeconds > 0;
  }

  static int _getTypePriority(AssetType type) {
    // Lower number = Higher priority
    switch (type) {
      case AssetType.giftCard:
        return 1; // Priority 2: Cash/Gift Cards
      case AssetType.coupon:
        return 2; // Priority 3: Percentage Coupons
      case AssetType.clubMembership:
        return 3; // Priority 4: Loyalty Club
    }
  }

  static String _getInstruction(Asset asset, int index) {
    if (index == 0) return "Scan this first to maximize savings";
    switch (asset.type) {
      case AssetType.giftCard:
         return "Then use this Gift Card balance";
      case AssetType.coupon:
        return "Apply this coupon next";
      case AssetType.clubMembership:
        return "Finally, scan membership to earn points";
    }
  }
}
