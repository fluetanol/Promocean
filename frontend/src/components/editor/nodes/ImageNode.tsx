import React from 'react';
import { DecoratorNode, NodeKey, SerializedLexicalNode } from 'lexical';

export interface SerializedImageNode extends SerializedLexicalNode {
  src: string;
  altText: string;
  width: 'inherit' | number;
  height: 'inherit' | number;
  caption?: string;
  type: 'image';
  version: 1;
}

export class ImageNode extends DecoratorNode<React.ReactElement> {
  __src: string;
  __altText: string;
  __width: 'inherit' | number;
  __height: 'inherit' | number;
  __caption?: string;

  static getType(): string {
    return 'image';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.__src,
      node.__altText,
      node.__width,
      node.__height,
      node.__caption,
      node.__key,
    );
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    return $createImageNode(
      serializedNode.src,
      serializedNode.altText,
      serializedNode.width,
      serializedNode.height,
      serializedNode.caption,
    );
  }

  exportJSON(): SerializedImageNode {
    return {
      src: this.__src,
      altText: this.__altText,
      width: this.__width,
      height: this.__height,
      caption: this.__caption,
      type: 'image',
      version: 1,
    };
  }

  constructor(
    src: string = '',
    altText: string = '',
    width: 'inherit' | number = 'inherit',
    height: 'inherit' | number = 'inherit',
    caption?: string,
    key?: NodeKey,
  ) {
    super(key);
    this.__src = src;
    this.__altText = altText;
    this.__width = width;
    this.__height = height;
    this.__caption = caption;
  }

  createDOM(): HTMLElement {
    const div = document.createElement('div');
    div.className = 'image-wrapper';
    return div;
  }

  updateDOM(): false {
    return false;
  }

  decorate(): React.ReactElement {
    return (
      <div className="my-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={this.__src}
          alt={this.__altText}
          style={{
            width: this.__width === 'inherit' ? '100%' : this.__width,
            height: this.__height === 'inherit' ? 'auto' : this.__height,
            maxWidth: '100%',
            borderRadius: '8px',
          }}
        />
        {this.__caption && (
          <p className="text-sm text-gray-600 mt-2 text-center italic">{this.__caption}</p>
        )}
      </div>
    );
  }
}

export function $createImageNode(
  src: string,
  altText: string,
  width?: 'inherit' | number,
  height?: 'inherit' | number,
  caption?: string,
): ImageNode {
  return new ImageNode(src, altText, width, height, caption);
}
