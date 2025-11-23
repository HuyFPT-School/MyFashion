"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Delete from "../custom ui/delete";
import MultiSelect from "../custom ui/multiSelect";
import MultiText from "../custom ui/multiText";
import ImageUploads from "../custom ui/imageUploads";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(500).trim(),
  image1: z.string().min(1, "Image 1 is required"),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

type ProductFormValues = z.infer<typeof formSchema>;
interface ProductFormProps {
  initialData?: ProductType | null;
}
const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [collections, setCollections] = useState<CollectionType[]>([]);
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
    } catch (error) {
      console.log("[collections_GET]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    getCollections();
  }, []);
  const defaultValues: ProductFormValues = initialData
    ? {
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        image1: initialData.media?.[0] ?? "",
        image2: initialData.media?.[1] ?? "",
        image3: initialData.media?.[2] ?? "",
        image4: initialData.media?.[3] ?? "",
        category: initialData.category ?? "",
        collections:
          initialData.collections?.map((collection) =>
            typeof collection === "string" ? collection : collection._id
          ) ?? [],
        tags: initialData.tags ?? [],
        sizes: initialData.sizes ?? [],
        colors: initialData.colors ?? [],
        price: initialData.price ?? 0.1,
        expense: initialData.expense ?? 0.1,
      }
    : {
        title: "",
        description: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        category: "",
        collections: [],
        tags: [],
        sizes: [],
        colors: [],
        price: 0.1,
        expense: 0.1,
      };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema) as Resolver<ProductFormValues>,
    defaultValues,
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      const media = [
        values.image1,
        values.image2,
        values.image3,
        values.image4,
      ].filter(Boolean);

      const payload = {
        ...values,
        media,
      };

      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        window.location.href = "/dashboard/products";
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.log("[products_POST]", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div className="px-4 lg:px-6">
      {initialData ? (
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Edit Product</p>
          <Delete item="product" id={initialData._id} />
        </div>
      ) : (
        <p className="text-2xl font-bold">Create Product</p>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 pt-5 pb-5"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" {...field} rows={5} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Upload Images</FormLabel>
            <div className="flex gap-4 flex-wrap">
              <FormField
                control={form.control}
                name="image1"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploads
                        value={field.value}
                        onChange={field.onChange}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image2"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploads
                        value={field.value || ""}
                        onChange={field.onChange}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image3"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploads
                        value={field.value || ""}
                        onChange={field.onChange}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image4"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploads
                        value={field.value || ""}
                        onChange={field.onChange}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Expense" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagToRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagToRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collections"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collections</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Collections"
                      collections={collections}
                      value={field.value}
                      onChange={(_id) => field.onChange([...field.value, _id])}
                      onRemove={(idToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (collectionId) => collectionId !== idToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Colors"
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (color) => color !== colorToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Sizes"
                      value={field.value}
                      onChange={(size) =>
                        field.onChange([...field.value, size])
                      }
                      onRemove={(sizeToRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (size) => size !== sizeToRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10">
            <Button type="submit" className="bg-blue-500 text-white">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-red-500 text-white"
              onClick={() => router.push("/dashboard/products")}
            >
              Discard
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
