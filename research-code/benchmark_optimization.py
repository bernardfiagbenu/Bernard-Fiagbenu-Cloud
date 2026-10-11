"""
Reproducible Benchmark of Nature-Inspired Metaheuristics:
Particle Swarm Optimization (PSO), Grey Wolf Optimizer (GWO),
and Differential Evolution (DE) on Classical Benchmark Functions.

Author: BERNARD FIAGBENU (Computer Scientist)
Environment: Python 3.10 standard library (no external dependencies required)
"""

import math
import random
import statistics
import json

# Benchmark Objective Functions (D dimensions, global optimum = 0 at origin or x*)
def sphere(x):
    return sum(xi ** 2 for xi in x)

def rastrigin(x):
    A = 10.0
    return A * len(x) + sum(xi ** 2 - A * math.cos(2 * math.pi * xi) for xi in x)

def ackley(x):
    n = len(x)
    s1 = sum(xi ** 2 for xi in x)
    s2 = sum(math.cos(2 * math.pi * xi) for xi in x)
    return -20.0 * math.exp(-0.2 * math.sqrt(s1 / n)) - math.exp(s2 / n) + 20.0 + math.e

def rosenbrock(x):
    return sum(100.0 * (x[i+1] - x[i]**2)**2 + (1.0 - x[i])**2 for i in range(len(x) - 1))

# 1. Particle Swarm Optimization (PSO)
def run_pso(func, dim, bounds, max_iter=200, pop_size=40, w=0.729, c1=1.494, c2=1.494, seed=42):
    random.seed(seed)
    lower, upper = bounds
    swarm = [[random.uniform(lower, upper) for _ in range(dim)] for _ in range(pop_size)]
    vel = [[random.uniform(-(upper-lower)*0.1, (upper-lower)*0.1) for _ in range(dim)] for _ in range(pop_size)]
    pbest = [list(pos) for pos in swarm]
    pbest_fit = [func(pos) for pos in swarm]
    
    gbest_idx = min(range(pop_size), key=lambda i: pbest_fit[i])
    gbest = list(pbest[gbest_idx])
    gbest_fit = pbest_fit[gbest_idx]
    
    for _ in range(max_iter):
        for i in range(pop_size):
            for d in range(dim):
                r1 = random.random()
                r2 = random.random()
                vel[i][d] = (w * vel[i][d] + 
                             c1 * r1 * (pbest[i][d] - swarm[i][d]) + 
                             c2 * r2 * (gbest[d] - swarm[i][d]))
                swarm[i][d] += vel[i][d]
                swarm[i][d] = max(lower, min(upper, swarm[i][d]))
            fit = func(swarm[i])
            if fit < pbest_fit[i]:
                pbest_fit[i] = fit
                pbest[i] = list(swarm[i])
                if fit < gbest_fit:
                    gbest_fit = fit
                    gbest = list(swarm[i])
    return gbest_fit

# 2. Grey Wolf Optimizer (GWO)
def run_gwo(func, dim, bounds, max_iter=200, pop_size=40, seed=42):
    random.seed(seed)
    lower, upper = bounds
    wolves = [[random.uniform(lower, upper) for _ in range(dim)] for _ in range(pop_size)]
    
    alpha = [0.0] * dim
    alpha_score = float('inf')
    beta = [0.0] * dim
    beta_score = float('inf')
    delta = [0.0] * dim
    delta_score = float('inf')
    
    for w in wolves:
        fit = func(w)
        if fit < alpha_score:
            delta_score, delta = beta_score, list(beta)
            beta_score, beta = alpha_score, list(alpha)
            alpha_score, alpha = fit, list(w)
        elif fit < beta_score:
            delta_score, delta = beta_score, list(beta)
            beta_score, beta = fit, list(w)
        elif fit < delta_score:
            delta_score, delta = fit, list(w)
            
    for t in range(max_iter):
        a = 2.0 - 2.0 * (t / max_iter)
        for i in range(pop_size):
            for d in range(dim):
                r1, r2 = random.random(), random.random()
                A1 = 2.0 * a * r1 - a
                C1 = 2.0 * r2
                D_alpha = abs(C1 * alpha[d] - wolves[i][d])
                X1 = alpha[d] - A1 * D_alpha
                
                r1, r2 = random.random(), random.random()
                A2 = 2.0 * a * r1 - a
                C2 = 2.0 * r2
                D_beta = abs(C2 * beta[d] - wolves[i][d])
                X2 = beta[d] - A2 * D_beta
                
                r1, r2 = random.random(), random.random()
                A3 = 2.0 * a * r1 - a
                C3 = 2.0 * r2
                D_delta = abs(C3 * delta[d] - wolves[i][d])
                X3 = delta[d] - A3 * D_delta
                
                wolves[i][d] = (X1 + X2 + X3) / 3.0
                wolves[i][d] = max(lower, min(upper, wolves[i][d]))
            
            fit = func(wolves[i])
            if fit < alpha_score:
                delta_score, delta = beta_score, list(beta)
                beta_score, beta = alpha_score, list(alpha)
                alpha_score, alpha = fit, list(wolves[i])
            elif fit < beta_score:
                delta_score, delta = beta_score, list(beta)
                beta_score, beta = fit, list(wolves[i])
            elif fit < delta_score:
                delta_score, delta = fit, list(wolves[i])
                
    return alpha_score

# 3. Differential Evolution (DE/rand/1/bin)
def run_de(func, dim, bounds, max_iter=200, pop_size=40, F=0.8, CR=0.9, seed=42):
    random.seed(seed)
    lower, upper = bounds
    pop = [[random.uniform(lower, upper) for _ in range(dim)] for _ in range(pop_size)]
    fitness = [func(ind) for ind in pop]
    
    for _ in range(max_iter):
        for i in range(pop_size):
            idxs = [idx for idx in range(pop_size) if idx != i]
            a, b, c = random.sample(idxs, 3)
            R = random.randint(0, dim - 1)
            trial = []
            for d in range(dim):
                if random.random() < CR or d == R:
                    val = pop[a][d] + F * (pop[b][d] - pop[c][d])
                    trial.append(max(lower, min(upper, val)))
                else:
                    trial.append(pop[i][d])
            trial_fit = func(trial)
            if trial_fit <= fitness[i]:
                pop[i] = trial
                fitness[i] = trial_fit
                
    return min(fitness)

# Non-parametric Wilcoxon signed-rank test approximation
def wilcoxon_signed_rank(x, y):
    diffs = [xi - yi for xi, yi in zip(x, y) if xi != yi]
    if not diffs:
        return 0, 1.0
    n = len(diffs)
    ranked = sorted([(abs(d), d) for d in diffs], key=lambda item: item[0])
    w_plus = sum(rank + 1 for rank, (abs_d, d) in enumerate(ranked) if d > 0)
    w_minus = sum(rank + 1 for rank, (abs_d, d) in enumerate(ranked) if d < 0)
    w_stat = min(w_plus, w_minus)
    # Normal approximation for n >= 20
    mean_w = n * (n + 1) / 4.0
    var_w = n * (n + 1) * (2 * n + 1) / 24.0
    z = (w_stat - mean_w) / math.sqrt(var_w)
    # Two-tailed p-value approximation
    p_approx = 2.0 * (1.0 - 0.5 * (1.0 + math.erf(abs(z) / math.sqrt(2))))
    return w_stat, p_approx

def main():
    dim = 30
    runs = 30
    benchmarks = {
        'Sphere': (sphere, (-100.0, 100.0)),
        'Rastrigin': (rastrigin, (-5.12, 5.12)),
        'Ackley': (ackley, (-32.0, 32.0)),
        'Rosenbrock': (rosenbrock, (-30.0, 30.0)),
    }
    
    results = {}
    print("Executing 30 independent runs across Sphere, Rastrigin, Ackley, Rosenbrock...")
    
    for name, (f, bounds) in benchmarks.items():
        results[name] = {'PSO': [], 'GWO': [], 'DE': []}
        for run_id in range(1, runs + 1):
            seed = 1000 + run_id
            pso_res = run_pso(f, dim, bounds, max_iter=250, pop_size=40, seed=seed)
            gwo_res = run_gwo(f, dim, bounds, max_iter=250, pop_size=40, seed=seed)
            de_res = run_de(f, dim, bounds, max_iter=250, pop_size=40, seed=seed)
            results[name]['PSO'].append(pso_res)
            results[name]['GWO'].append(gwo_res)
            results[name]['DE'].append(de_res)
            
    summary = {}
    for name in benchmarks:
        summary[name] = {}
        for algo in ['PSO', 'GWO', 'DE']:
            arr = results[name][algo]
            m = statistics.mean(arr)
            sd = statistics.stdev(arr)
            summary[name][algo] = {'mean': m, 'stdev': sd, 'median': statistics.median(arr)}
        w_pso_de, p_val1 = wilcoxon_signed_rank(results[name]['PSO'], results[name]['DE'])
        w_gwo_de, p_val2 = wilcoxon_signed_rank(results[name]['GWO'], results[name]['DE'])
        summary[name]['statistical_test'] = {
            'PSO_vs_DE': {'W': w_pso_de, 'p_value': p_val1},
            'GWO_vs_DE': {'W': w_gwo_de, 'p_value': p_val2}
        }
        
    with open('research-code/optimization_benchmark_results.json', 'w') as out_f:
        json.dump(summary, out_f, indent=2)
        
    print("Benchmark completed. Results written to research-code/optimization_benchmark_results.json")

if __name__ == '__main__':
    main()
