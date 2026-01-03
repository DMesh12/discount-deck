import 'package:flutter/material.dart';
import '../models/asset_model.dart';
import 'package:intl/intl.dart';

class AssetCard extends StatelessWidget {
  final Asset asset;

  const AssetCard({super.key, required this.asset});

  @override
  Widget build(BuildContext context) {
    // Generate color based on type if custom not provided
    final cardColor = asset.customColor ?? _getColorByType(asset.type);

    return Container(
      height: 100,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Row(
        children: [
            // Left color strip/Logo area
          Container(
            width: 100,
            decoration: BoxDecoration(
              color: cardColor,
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(16),
                bottomLeft: Radius.circular(16),
              ),
            ),
            child: Center(
                child: Text(
                    asset.storeName[0],
                    style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold)
                )
            ),
          ),
          
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    asset.storeName,
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    _getSubtitle(asset),
                    style: TextStyle(
                      color: Colors.grey[600],
                      fontSize: 14,
                    ),
                  ),
                   const SizedBox(height: 4),
                   Text(
                    'Exp: ${DateFormat('dd/MM/yy').format(asset.expiryDate)}',
                     style: TextStyle(
                      color: Colors.grey[400],
                      fontSize: 12,
                    ),
                   )

                ],
              ),
            ),
          ),
           Padding(
             padding: const EdgeInsets.only(right: 16.0),
             child: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.grey[400]),
           )
        ],
      ),
    );
  }

  Color _getColorByType(AssetType type) {
    switch (type) {
      case AssetType.giftCard:
        return const Color(0xFF00C853);
      case AssetType.clubMembership:
        return const Color(0xFFFFD700); // Gold
      case AssetType.coupon:
        return const Color(0xFFFF5722);
    }
  }

  String _getSubtitle(Asset asset) {
     if (asset.type == AssetType.giftCard) {
         return 'Value: ₪${asset.value}';
     } else if (asset.type == AssetType.coupon) {
         return asset.terms;
     } else {
         return 'Member';
     }
  }
}
