import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/store_model.dart';
import '../models/asset_model.dart';
import '../models/redemption_step.dart';
import '../logic/optimization_engine.dart';
import '../providers/providers.dart';

class SmartRedemptionScreen extends ConsumerStatefulWidget {
  final Store store;

  const SmartRedemptionScreen({super.key, required this.store});

  @override
  ConsumerState<SmartRedemptionScreen> createState() => _SmartRedemptionScreenState();
}

class _SmartRedemptionScreenState extends ConsumerState<SmartRedemptionScreen> {
  List<RedemptionStep> _steps = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadStrategy();
  }

  Future<void> _loadStrategy() async {
    // Fetch assets from provider
    final assets = await ref.read(assetsProvider.future);
    
    // Calculate strategy
    final strategy = OptimizationEngine.getBestStrategy(widget.store, assets);
    
    setState(() {
      _steps = strategy;
      _isLoading = false;
    });
  }

  void _markAsUsed(int index) {
    setState(() {
      _steps[index].isUsed = true;
    });
    // In a real app, we would update the backend/local db here
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F7),
      appBar: AppBar(
        title: Text(widget.store.name),
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.close, color: Colors.black),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Header
                Container(
                  padding: const EdgeInsets.all(16),
                  color: Colors.white,
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 24,
                        backgroundColor: Colors.grey[200],
                        backgroundImage: widget.store.logoUrl.startsWith('http') 
                            ? NetworkImage(widget.store.logoUrl) 
                            : AssetImage(widget.store.logoUrl) as ImageProvider,
                         // Fallback for placeholder
                         onBackgroundImageError: (_, __) {},
                         child: widget.store.logoUrl.startsWith('assets') ? null : const Icon(Icons.store),
                      ),
                      const SizedBox(width: 16),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Smart Redemption',
                            style: Theme.of(context).textTheme.titleSmall?.copyWith(color: Colors.grey),
                          ),
                          Text(
                            'Best Deal Strategy',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: Theme.of(context).primaryColor,
                            ),
                          ),
                        ],
                      )
                    ],
                  ),
                ),
                
                // Steps List
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _steps.length,
                    itemBuilder: (context, index) {
                      return _buildStepCard(_steps[index], index);
                    },
                  ),
                ),
                
                // Footer
                _buildFooter(),
              ],
            ),
    );
  }

  Widget _buildStepCard(RedemptionStep step, int index) {
    if (step.isUsed) {
      return Container(
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey[200],
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            const Icon(Icons.check_circle, color: Colors.grey),
            const SizedBox(width: 16),
            Text(
              'Step ${step.orderIndex} Completed',
              style: const TextStyle(
                color: Colors.grey,
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.lineThrough,
              ),
            ),
          ],
        ),
      );
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 24),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.08),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          // Step Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: BoxDecoration(
              color: _getStepColor(step.asset.type).withOpacity(0.1),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
              ),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: _getStepColor(step.asset.type),
                  radius: 12,
                  child: Text(
                    '${step.orderIndex}',
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    step.instruction,
                    style: TextStyle(
                      color: _getStepColor(step.asset.type),
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Step Body
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                Text(
                  step.asset.terms.isNotEmpty ? step.asset.terms : step.asset.storeName,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                // Mock Barcode
                Container(
                  height: 80,
                  width: double.infinity,
                  color: Colors.black,
                  alignment: Alignment.center,
                  child: Text(
                    step.asset.barcodeData,
                    style: const TextStyle(color: Colors.white, fontFamily: 'monospace', letterSpacing: 4),
                  ),
                ),
                const SizedBox(height: 16),
                if (step.asset.value > 0)
                  Text(
                    'Value: ₪${step.asset.value}',
                     style: const TextStyle(
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
              ],
            ),
          ),
          
          // Action Button
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => _markAsUsed(index),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.black87,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                child: const Text('Mark as Used'),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter() {
    final double totalValue = _steps.fold(0, (sum, step) => sum + step.asset.value);
    
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            offset: const Offset(0, -4),
            blurRadius: 10,
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          const Text(
            'Total Savings:',
            style: TextStyle(
              fontSize: 16,
              color: Colors.grey,
            ),
          ),
          Text(
            '₪${totalValue.toStringAsFixed(0)}',
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Color(0xFF00C853),
            ),
          ),
        ],
      ),
    );
  }

  Color _getStepColor(AssetType type) {
    switch (type) {
      case AssetType.giftCard:
        return const Color(0xFF00C853);
      case AssetType.coupon:
        return const Color(0xFFFF5722);
      case AssetType.clubMembership:
        return const Color(0xFF6750A4);
    }
  }
}
