import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, FileJson, Cloud, ArrowRight, Table, BarChart } from 'lucide-react';

export const DataPipeline: React.FC = () => {
    return (
        <div className="w-full py-20 bg-dark overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">ETL <span className="text-gradient">Workflow</span></h2>
                <p className="text-slate-400 font-mono text-sm max-w-2xl mx-auto">
                    Visualizing the data engineering lifecycle: Extract, Transform, Load.
                </p>
            </div>

            {/* Pipeline Container */}
            <div className="max-w-6xl mx-auto relative h-[400px] flex items-center justify-center">

                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.path
                        d="M 150,200 L 400,200 L 650,200 L 900,200"
                        stroke="#1e293b"
                        strokeWidth="4"
                        fill="none"
                    />
                    {/* Animated Data Flow */}
                    <motion.path
                        d="M 150,200 L 400,200 L 650,200 L 900,200"
                        stroke="#0ea5e9"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="10 10"
                        animate={{ strokeDashoffset: [100, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                </svg>

                {/* Nodes */}
                <div className="flex w-full justify-between px-10 md:px-20 z-10 relative">

                    {/* Node 1: Ingestion */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            className="w-24 h-24 bg-dark-lighter border-2 border-slate-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                            whileHover={{ scale: 1.1, borderColor: '#22c55e' }}
                        >
                            <Database size={40} className="text-slate-400" />
                        </motion.div>
                        <div className="text-center">
                            <div className="text-white font-mono font-bold">INGESTION</div>
                            <div className="text-xs text-slate-500 mt-1">Raw Data Logs</div>
                        </div>
                    </div>

                    {/* Node 2: Processing */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            className="w-24 h-24 bg-dark-lighter border-2 border-slate-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.1)] relative"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            whileHover={{ scale: 1.1, borderColor: '#0ea5e9' }}
                        >
                            <Server size={40} className="text-primary" />
                            {/* Spinning Ring */}
                            <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-xl animate-[spin_10s_linear_infinite]"></div>
                        </motion.div>
                        <div className="text-center">
                            <div className="text-white font-mono font-bold">TRANSFORM</div>
                            <div className="text-xs text-slate-500 mt-1">Spark / Databricks</div>
                        </div>
                    </div>

                    {/* Node 3: Storage */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            className="w-24 h-24 bg-dark-lighter border-2 border-slate-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.1)]"
                            whileHover={{ scale: 1.1, borderColor: '#6366f1' }}
                        >
                            <Table size={40} className="text-accent" />
                        </motion.div>
                        <div className="text-center">
                            <div className="text-white font-mono font-bold">WAREHOUSE</div>
                            <div className="text-xs text-slate-500 mt-1">Delta Lake / SQL</div>
                        </div>
                    </div>

                    {/* Node 4: Analytics */}
                    <div className="flex flex-col items-center gap-4">
                        <motion.div
                            className="w-24 h-24 bg-dark-lighter border-2 border-slate-700 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.1)]"
                            whileHover={{ scale: 1.1, borderColor: '#eab308' }}
                        >
                            <BarChart size={40} className="text-yellow-500" />
                        </motion.div>
                        <div className="text-center">
                            <div className="text-white font-mono font-bold">INSIGHTS</div>
                            <div className="text-xs text-slate-500 mt-1">Power BI / ML</div>
                        </div>
                    </div>

                </div>

                {/* Floating Particles (Data Packets) */}
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
                        initial={{ x: -400, opacity: 0 }}
                        animate={{
                            x: [-400, 400],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 1,
                            ease: "linear",
                            repeatDelay: 0.5
                        }}
                        style={{ top: '50%', marginTop: '-6px' }}
                    />
                ))}

            </div>
        </div>
    );
};
