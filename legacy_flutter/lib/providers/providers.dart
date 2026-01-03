import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/mock_repository.dart';
import '../models/asset_model.dart';

final mockRepositoryProvider = Provider<MockRepository>((ref) => MockRepository());

final assetsProvider = FutureProvider<List<Asset>>((ref) async {
  final repository = ref.watch(mockRepositoryProvider);
  return repository.getAssets();
});

final totalSavingsProvider = Provider<double>((ref) {
  final assetsAsync = ref.watch(assetsProvider);
  return assetsAsync.maybeWhen(
    data: (assets) => assets.fold(0, (sum, asset) => sum + asset.value),
    orElse: () => 0.0,
  );
});
