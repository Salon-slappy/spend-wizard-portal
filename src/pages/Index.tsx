
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">XpenseS</h1>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Track Your Expenses with Ease</h2>
            <p className="text-lg text-gray-600 max-w-md">
              XpenseS helps you monitor, analyze, and optimize your spending with powerful tracking tools and insightful reports.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary rounded-xl blur-lg"></div>
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-border/50">
                <img 
                  src="/placeholder.svg" 
                  alt="XpenseS Dashboard Preview" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Track Expenses</h3>
            <p className="text-gray-600">Log and categorize all your expenses in one place for easy tracking.</p>
          </div>
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Visualize Data</h3>
            <p className="text-gray-600">See your spending patterns with intuitive charts and graphs.</p>
          </div>
          <div className="p-6 rounded-lg border bg-card shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Smart Insights</h3>
            <p className="text-gray-600">Get personalized recommendations to improve your financial habits.</p>
          </div>
        </div>
      </main>

      <footer className="bg-secondary py-8">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-gray-600">© 2023 XpenseS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
