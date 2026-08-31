<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  Rocket,
  Sparkles,
  Wrench,
  Frame,
  FileText,
  Braces,
  Clock,
  Palette,
  Regex,
  Code2,
  PenTool,
  Youtube,
  BookOpen,
  Github,
  Cloud,
  Globe,
  Database,
  Feather,
  Server,
  Sun,
  Moon,
  Search,
  X,
  Pin,
  PinOff,
  ExternalLink,
  ArrowUp,
  ArrowRight,
  SlidersHorizontal,
  Settings,
  Heart,
  Link,
  Circle,
  Terminal,
  Cpu,
  Layers,
  GitBranch,
  Coffee,
  Mail,
  ChevronDown,
  Eye,
  Play,
  GitMerge,
  Radio,
  Video,
  Box,
  Hexagon,
  Leaf,
  DoorOpen,
  Waves,
  MoreHorizontal,
  Calendar,
  Archive,
  FolderOpen,
  Tag,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Rss,
  List,
  Copy,
  Check,
  Menu,
} from 'lucide-vue-next'

const registry: Record<string, Component> = {
  Rocket, Sparkles, Wrench, Frame, FileText, Braces, Clock, Palette, Regex,
  Code2, PenTool, Youtube, BookOpen, Github, Cloud, Globe, Database,
  Feather, Server, Sun, Moon, Search, X, Pin, PinOff, ExternalLink, ArrowUp,
  ArrowRight, SlidersHorizontal, Settings, Heart, Link, Circle, Terminal,
  Cpu, Layers, GitBranch, Coffee, Mail, ChevronDown,
  Eye, Play, GitMerge, Radio, Video, Box, Hexagon, Leaf, DoorOpen, Waves,
  MoreHorizontal, Calendar, Archive, FolderOpen, Tag, ChevronLeft, ChevronRight,
  User, Shield, Rss, List, Copy, Check, Menu,
}

const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    strokeWidth?: number | string
  }>(),
  {
    size: 20,
    strokeWidth: 2,
  },
)

const icon = computed<Component>(() => registry[props.name] ?? Link)
</script>

<template>
  <component :is="icon" :size="size" :stroke-width="strokeWidth" aria-hidden="true" />
</template>
