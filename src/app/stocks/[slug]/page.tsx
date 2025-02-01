import Layout from "@/components/Layout";

export default function Page({ params }: { params: { slug: string } }) {
  return <Layout>{params.slug}</Layout>;
}
