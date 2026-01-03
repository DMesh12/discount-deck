import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'screens/dashboard_screen.dart';

void main() {
  runApp(const ProviderScope(child: DiscountDeckApp()));
}

class DiscountDeckApp extends StatelessWidget {
  const DiscountDeckApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Discount Deck',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6750A4), // Deep Purple
          secondary: const Color(0xFF00C853), // Vibrant Green
          brightness: Brightness.light,
        ),
        textTheme: GoogleFonts.outfitTextTheme(),
        scaffoldBackgroundColor: const Color(0xFFF5F5F7), // Light Gray
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.transparent,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: TextStyle(
            color: Colors.black87,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      home: const DashboardScreen(),
    );
  }
}
