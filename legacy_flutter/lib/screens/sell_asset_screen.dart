import 'package:flutter/material.dart';
import '../models/asset_model.dart';
import '../logic/marketplace_service.dart';

class SellAssetScreen extends StatefulWidget {
  final Asset asset;

  const SellAssetScreen({super.key, required this.asset});

  @override
  State<SellAssetScreen> createState() => _SellAssetScreenState();
}

class _SellAssetScreenState extends State<SellAssetScreen> {
  late double _desiredCash;
  
  // State for calculations
  double _buyerPrice = 0;
  double _platformFee = 0;
  int _discountPercent = 0;
  String _likelihood = "Medium";

  @override
  void initState() {
    super.initState();
    // Default to 80% of value
    _desiredCash = widget.asset.value * 0.8;
    _recalculate();
  }

  void _recalculate() {
    final details = MarketplaceService.calculateListingDetails(widget.asset.value, _desiredCash);
    setState(() {
      _buyerPrice = details['buyerPrice'];
      _platformFee = details['platformFee'];
      _discountPercent = details['discountPercent'];
      _likelihood = MarketplaceService.getSaleLikelihood(_discountPercent);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sell Asset')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          children: [
            // Header Card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                boxShadow: const [BoxShadow(color: Colors.black12, blurRadius: 10)],
              ),
              child: Column(
                children: [
                  Text('Selling ${widget.asset.storeName} Gift Card', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  Text('Face Value: ₪${widget.asset.value.toStringAsFixed(0)}', style: const TextStyle(fontSize: 14, color: Colors.grey)),
                ],
              ),
            ),
            const SizedBox(height: 32),
            
            // Slider
            Text('I want to receive:', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            Text('₪${_desiredCash.toStringAsFixed(0)}', style: const TextStyle(fontSize: 40, fontWeight: FontWeight.bold, color: Colors.deepPurple)),
            Slider(
              value: _desiredCash,
              min: widget.asset.value * 0.5,
              max: widget.asset.value * 0.95,
              activeColor: Colors.deepPurple,
              onChanged: (val) {
                setState(() {
                  _desiredCash = val;
                });
                _recalculate();
              },
            ),
            
            const SizedBox(height: 32),
            
            // Summary Grid
            Row(
              children: [
                Expanded(child: _buildInfoCard('Buyer Pays', '₪${_buyerPrice.toStringAsFixed(0)}')),
                const SizedBox(width: 16),
                Expanded(child: _buildInfoCard('Our Fee', '₪${_platformFee.toStringAsFixed(0)}')),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(child: _buildInfoCard('Discount', '$_discountPercent%')),
                const SizedBox(width: 16),
                Expanded(child: _buildInfoCard('Likelihood', _likelihood, 
                  isHighlighted: true, 
                  highlightColor: _likelihood == 'High' ? Colors.green : (_likelihood == 'Medium' ? Colors.orange : Colors.red)
                )),
              ],
            ),
            
            const SizedBox(height: 48),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                   Navigator.of(context).pop();
                   ScaffoldMessenger.of(context).showSnackBar(
                     const SnackBar(content: Text('Listed for sale successfully!')),
                   );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.deepPurple,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                   shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('List for Sale'),
              ),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildInfoCard(String label, String value, {bool isHighlighted = false, Color? highlightColor}) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
        border: isHighlighted ? Border.all(color: highlightColor!, width: 2) : null,
      ),
      child: Column(
        children: [
          Text(label, style: const TextStyle(color: Colors.grey)),
          const SizedBox(height: 4),
          Text(value, style: TextStyle(
            fontSize: 20, 
            fontWeight: FontWeight.bold,
            color: isHighlighted ? highlightColor : Colors.black87
          )),
        ],
      ),
    );
  }
}
