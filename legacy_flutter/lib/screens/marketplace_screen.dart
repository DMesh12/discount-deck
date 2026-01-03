import 'package:flutter/material.dart';
import '../logic/marketplace_service.dart';
import '../models/market_listing.dart';

class MarketplaceScreen extends StatelessWidget {
  const MarketplaceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final listings = MarketplaceService.getMockListings();

    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F7), // Light Gray
      appBar: AppBar(
        title: const Text('Discount Deck Market'),
        centerTitle: true,
        actions: [
          IconButton(icon: const Icon(Icons.search), onPressed: () {})
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
             const Text(
              'Featured Deals',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  childAspectRatio: 0.75, // Tall cards
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                ),
                itemCount: listings.length,
                itemBuilder: (context, index) {
                  return _buildListingCard(context, listings[index]);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildListingCard(BuildContext context, MarketListing listing) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Image/Logo placeholder
          Expanded(
            flex: 2,
            child: Container(
              decoration: BoxDecoration(
                color: Colors.grey[100],
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
              ),
              child: Center(
                child: listing.storeLogoUrl.startsWith('assets') 
                  ? const Icon(Icons.store, size: 48, color: Colors.grey)
                  : Image.network(listing.storeLogoUrl, errorBuilder: (_,__,___) => const Icon(Icons.error)),
              ),
            ),
          ),
          
          // Discount Badge
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 4),
            color: const Color(0xFF00C853),
            child: Text(
              '${listing.discountPercent}% OFF',
              textAlign: TextAlign.center,
              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
            ),
          ),

          // Details
          Expanded(
            flex: 3,
            child: Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    listing.storeName,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  Row(
                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
                     children: [
                       Text('Value:', style: TextStyle(color: Colors.grey[600], fontSize: 12)),
                       Text('₪${listing.faceValue.toStringAsFixed(0)}', style: const TextStyle(decoration: TextDecoration.lineThrough, color: Colors.grey)),
                     ],
                  ),
                  const Divider(height: 16),
                  const Text('Price', style: TextStyle(fontSize: 12, color: Colors.grey)),
                  Text(
                    '₪${listing.buyerPrice.toStringAsFixed(0)}',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.deepPurple,
                    ),
                  ),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () {
                         ScaffoldMessenger.of(context).showSnackBar(
                           SnackBar(content: Text('Purchased ${listing.storeName} card for ₪${listing.buyerPrice}')),
                         );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.black87,
                         foregroundColor: Colors.white,
                         minimumSize: const Size(0, 32),
                         padding: const EdgeInsets.symmetric(vertical: 0),
                      ),
                      child: const Text('Buy Now'),
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
