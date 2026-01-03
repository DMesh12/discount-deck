import '../models/asset_model.dart';

class RedemptionStep {
  final Asset asset;
  final String instruction;
  final int orderIndex;
  
  // Transient state for UI
  bool isUsed;

  RedemptionStep({
    required this.asset,
    required this.instruction,
    required this.orderIndex,
    this.isUsed = false,
  });
}
