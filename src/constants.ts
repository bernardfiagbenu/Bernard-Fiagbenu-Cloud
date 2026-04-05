export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Cloud Computing in 2026',
    excerpt: 'Exploring the shift towards decentralized cloud architectures and the impact of edge computing on global infrastructure.',
    content: `
      <p>Cloud computing is undergoing a massive transformation. As we move further into 2026, the traditional centralized model is giving way to more distributed architectures.</p>
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is no longer a niche concept. It's becoming the backbone of real-time applications, from autonomous vehicles to smart cities. By processing data closer to the source, we reduce latency and bandwidth usage significantly.</p>
      <h2>Decentralized Cloud Architectures</h2>
      <p>We're seeing a shift towards multi-cloud and inter-cloud strategies. Organizations are no longer putting all their eggs in one basket, instead opting for a mix of providers to ensure resilience and cost-efficiency.</p>
      <blockquote>"The cloud is not just a place to store data anymore; it's the engine of innovation for the next decade."</blockquote>
      <p>In conclusion, the future of cloud computing is distributed, intelligent, and highly integrated into our physical world.</p>
    `,
    date: 'April 5, 2026',
    readTime: '8 min read',
    category: 'Cloud Computing',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    author: 'Bernard Fiagbenu'
  },
  {
    id: '2',
    title: 'AI Ethics: Navigating the New Frontier',
    excerpt: 'As AI models become more integrated into our daily lives, how do we ensure transparency and fairness in automated decision-making?',
    content: `
      <p>Artificial Intelligence is no longer a futuristic dream; it's a present reality. However, with great power comes great responsibility.</p>
      <h2>Transparency in AI</h2>
      <p>One of the biggest challenges in AI today is the "black box" problem. How do we know why an AI made a certain decision? Explainable AI (XAI) is a growing field dedicated to making AI models more transparent and understandable to humans.</p>
      <h2>Bias and Fairness</h2>
      <p>AI models are only as good as the data they're trained on. If the training data contains biases, the AI will likely replicate or even amplify those biases. Ensuring fairness requires diverse datasets and rigorous testing.</p>
      <p>As we continue to develop and deploy AI, we must keep ethics at the forefront of our innovation.</p>
    `,
    date: 'March 28, 2026',
    readTime: '12 min read',
    category: 'Artificial Intelligence',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    author: 'Bernard Fiagbenu'
  },
  {
    id: '3',
    title: 'Building Scalable Microservices with Go',
    excerpt: 'A deep dive into the patterns and practices for creating resilient distributed systems using the Go programming language.',
    content: `
      <p>Go has become the language of choice for cloud-native development. Its simplicity, performance, and built-in concurrency make it ideal for building microservices.</p>
      <h2>Why Go for Microservices?</h2>
      <p>Go's goroutines and channels provide a powerful model for handling concurrent tasks without the complexity of traditional threading. This is crucial for microservices that need to handle thousands of simultaneous connections.</p>
      <h2>Resilience Patterns</h2>
      <p>Building scalable systems isn't just about handling load; it's about handling failure. Implementing patterns like circuit breakers, retries, and timeouts is essential for creating resilient microservices.</p>
      <p>In this article, we've explored how Go can help you build systems that are not only fast but also robust and easy to maintain.</p>
    `,
    date: 'March 15, 2026',
    readTime: '15 min read',
    category: 'Software Engineering',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    author: 'Bernard Fiagbenu'
  }
];
