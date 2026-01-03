import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/providers.dart';
import '../models/asset_model.dart';
import '../widgets/asset_card.dart';
import '../screens/smart_redemption_screen.dart';
import '../models/store_model.dart';
import '../screens/marketplace_screen.dart';
import '../screens/sell_asset_screen.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final totalSavings = ref.watch(totalSavingsProvider);
    final assetsAsync = ref.watch(assetsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Discount Deck'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
          const CircleAvatar(
            backgroundColor: Colors.deepPurple,
            child: Text('D', style: TextStyle(color: Colors.white)),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header: Total Savings
              _buildSavingsHeader(context, totalSavings),
              const SizedBox(height: 24),
              
              // Quick Actions
              _buildQuickActions(context),
              const SizedBox(height: 24),

              // Recent Assets
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Recent Assets',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  TextButton(
                    onPressed: () {
                      // SIMULATION: Launch Super-Pharm Scenario
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => SmartRedemptionScreen(
                            store: Store(
                              id: '2', 
                              name: 'Super-Pharm', 
                              logoUrl: 'assets/logos/superpharm.png', 
                              category: 'Health', 
                              latitude: 0, 
                              longitude: 0
                            ),
                          ),
                        ),
                      );
                    },
                    child: const Text('Simulate POS'),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              
              assetsAsync.when(
                data: (assets) {
                  return ListView.separated(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: assets.length,
                    separatorBuilder: (context, index) => const SizedBox(height: 12),
                    itemBuilder: (context, index) {
                      final asset = assets[index];
                      return GestureDetector(
                        onLongPress: () {
                           // Long press to SELL
                            Navigator.of(context).push(MaterialPageRoute(builder: (_) => SellAssetScreen(asset: asset)));
                        },
                        child: AssetCard(asset: asset),
                      );
                    },
                  );
                },
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (err, stack) => const Text('Error loading assets'),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: 0,
        onDestinationSelected: (index) {},
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon: Icon(Icons.dashboard),
            label: 'Home',
          ),
           NavigationDestination(
            icon: Icon(Icons.account_balance_wallet_outlined),
            selectedIcon: Icon(Icons.account_balance_wallet),
            label: 'Wallet',
          ),
           NavigationDestination(
            icon: Icon(Icons.qr_code_scanner),
            label: 'Scan',
          ),
             NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  Widget _buildSavingsHeader(BuildContext context, double savings) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF6750A4), Color(0xFF9C27B0)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.deepPurple.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Total Savings Potential',
            style: TextStyle(
              color: Colors.white70,
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '₪${savings.toStringAsFixed(0)}',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 40,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildQuickActions(BuildContext context) {
    return SizedBox(
      height: 100,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: [
          _buildActionItem(context, Icons.add_a_photo, 'Scan New'),
          const SizedBox(width: 16),
            GestureDetector(
             onTap: () {
                // Open Marketplace
                Navigator.of(context).push(MaterialPageRoute(builder: (_) => const MarketplaceScreen()));
             },
             child: _buildActionItem(context, Icons.shopping_bag, 'Market'),
           ),
          const SizedBox(width: 16),
          _buildActionItem(context, Icons.location_on, 'Nearby'),
          const SizedBox(width: 16),
          _buildActionItem(context, Icons.timer, 'Expiring'),
        ],
      ),
    );
  }
  
  Widget _buildActionItem(BuildContext context, IconData icon, String label) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(16),
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
          child: Icon(icon, color: Theme.of(context).primaryColor),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
      ],
    );
  }
}
